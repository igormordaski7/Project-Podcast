using Microsoft.AspNetCore.Mvc;
using MeuProjeto.Models;
using MeuProjeto.Services;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace MeuProjeto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly SupabaseService _supabase;
        private readonly IConfiguration _configuration;

        public AuthController(SupabaseService supabase, IConfiguration configuration)
        {
            _supabase = supabase;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            Console.WriteLine($"=== TENTATIVA DE LOGIN ===");
            Console.WriteLine($"Email: {dto?.Email}");

            if (dto == null || string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Senha))
                return BadRequest("Email e senha são obrigatórios.");

            try
            {
                var result = await _supabase.Client
                    .From<Usuario>()
                    .Where(u => u.Email == dto.Email)
                    .Get();

                var usuario = result.Models.FirstOrDefault();

                if (usuario == null)
                {
                    Console.WriteLine("Usuário não encontrado");
                    return Unauthorized("Credenciais inválidas.");
                }

                Console.WriteLine($"Usuário encontrado: {usuario.Email}");
                Console.WriteLine($"Hash no banco: {usuario.Senha}");

                // 8. Verifique o usuário e a senha com BCrypt
                if (usuario == null || !BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.Senha))
                {
                    Console.WriteLine("Senha inválida");
                    return Unauthorized("Credenciais inválidas.");
                }

                Console.WriteLine("Senha válida, gerando token...");

                // 9. Gere o Token JWT
                var token = GenerateJwtToken(usuario);

                // 10. Retorne o token e os dados do usuário
                return Ok(new
                {
                    Token = token,
                    Usuario = new UsuarioDto
                    {
                        Id = usuario.Id,
                        Nome = usuario.Nome,
                        Turma = usuario.Turma,
                        Email = usuario.Email
                    }
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERRO NO LOGIN: {ex}");
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        // ADICIONE ESTES NOVOS ENDPOINTS PARA DEBUG:

        [HttpPost("test-bcrypt")]
        public IActionResult TestBcrypt([FromBody] TestBcryptDto dto)
        {
            try
            {
                Console.WriteLine($"=== TESTE BCRYPT ===");
                Console.WriteLine($"Senha fornecida: {dto.Senha}");
                Console.WriteLine($"Hash fornecido: {dto.Hash}");

                // Testar geração de novo hash
                var novoHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha);
                Console.WriteLine($"Novo hash gerado: {novoHash}");

                // Testar verificação com o hash existente
                var isValid = BCrypt.Net.BCrypt.Verify(dto.Senha, dto.Hash);
                Console.WriteLine($"Verificação com hash existente: {isValid}");

                return Ok(new
                {
                    NovoHash = novoHash,
                    VerificacaoExistente = isValid,
                    Mensagem = "Teste BCrypt completo"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERRO no teste BCrypt: {ex}");
                return BadRequest(new
                {
                    Erro = ex.Message,
                    Tipo = ex.GetType().Name
                });
            }
        }

        [HttpPost("create-test-users")]
        public async Task<IActionResult> CreateTestUsers()
        {
            try
            {
                Console.WriteLine("=== CRIANDO USUÁRIOS DE TESTE ===");

                var testUsers = new[]
                {
                    new { Nome = "Usuário Teste", Email = "teste@teste.com", Senha = "senha123", Turma = "default" },
                    new { Nome = "Admin Teste", Email = "admin@teste.com", Senha = "admin123", Turma = "default" }
                };

                var results = new List<object>();

                foreach (var testUser in testUsers)
                {
                    Console.WriteLine($"Processando usuário: {testUser.Email}");

                    // Verificar e deletar usuário existente
                    var existing = await _supabase.Client
                        .From<Usuario>()
                        .Where(u => u.Email == testUser.Email)
                        .Get();

                    if (existing.Models.Any())
                    {
                        Console.WriteLine($"Deletando usuário existente: {testUser.Email}");
                        await _supabase.Client.From<Usuario>().Delete(existing.Models.First());
                    }

                    // Criar novo hash
                    Console.WriteLine($"Criando novo hash para: {testUser.Email}");
                    var senhaHash = BCrypt.Net.BCrypt.HashPassword(testUser.Senha);
                    Console.WriteLine($"Novo hash criado: {senhaHash}");

                    // Criar novo usuário
                    var usuario = new Usuario
                    {
                        Nome = testUser.Nome,
                        Email = testUser.Email,
                        Turma = testUser.Turma,
                        Senha = senhaHash
                    };

                    var result = await _supabase.Client.From<Usuario>().Insert(usuario);
                    var created = result.Models.FirstOrDefault();

                    if (created != null)
                    {
                        Console.WriteLine($"Usuário criado com sucesso: {created.Email}");
                        results.Add(new
                        {
                            Email = created.Email,
                            Nome = created.Nome,
                            Hash = created.Senha,
                            Id = created.Id
                        });
                    }
                }

                return Ok(new
                {
                    Message = "Usuários de teste criados com sucesso",
                    Usuarios = results
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERRO ao criar usuários de teste: {ex}");
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        // 11. Método para gerar o token
        // Dentro da classe AuthController, no método GenerateJwtToken

        private string GenerateJwtToken(Usuario usuario)
        {
            var jwtKey = _configuration["Jwt:Key"];
            var jwtIssuer = _configuration["Jwt:Issuer"];

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // MODIFICAR A CRIAÇÃO DAS CLAIMS
            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.Sub, usuario.Email),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim("id", usuario.Id.ToString()),
        // ADICIONAR ESTA LINHA
        new Claim(ClaimTypes.Role, usuario.Role)
    };

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtIssuer,
                claims: claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    // DTO para o teste do BCrypt
    public class TestBcryptDto
    {
        public string Senha { get; set; } = null!;
        public string Hash { get; set; } = null!;
    }
}