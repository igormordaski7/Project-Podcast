using Microsoft.AspNetCore.Mvc;
using MeuProjeto.Models;
using MeuProjeto.Services;
using BCrypt.Net; // 1. Importe o BCrypt
using System.IdentityModel.Tokens.Jwt; // 2. Importe para JWT
using System.Security.Claims; // 3. Importe para Claims
using Microsoft.IdentityModel.Tokens; // 4. Importe para Tokens
using System.Text; // 5. Importe para Encoding

namespace MeuProjeto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly SupabaseService _supabase;
        private readonly IConfiguration _configuration; // 6. Injete a configuração

        public AuthController(SupabaseService supabase, IConfiguration configuration)
        {
            _supabase = supabase;
            _configuration = configuration; // 7. Atribua a configuração
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (dto == null || string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Senha))
                return BadRequest("Email e senha são obrigatórios.");

            var result = await _supabase.Client
                .From<Usuario>()
                .Where(u => u.Email == dto.Email)
                .Get();

            var usuario = result.Models.FirstOrDefault();

            // 8. Verifique o usuário e a senha com BCrypt
            if (usuario == null || !BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.Senha))
                return Unauthorized("Credenciais inválidas.");

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

        // 11. Método para gerar o token
        private string GenerateJwtToken(Usuario usuario)
        {
            var jwtKey = _configuration["Jwt:Key"];
            var jwtIssuer = _configuration["Jwt:Issuer"];

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("id", usuario.Id.ToString()) // Adiciona o ID do usuário ao token
            };

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtIssuer,
                claims: claims,
                expires: DateTime.Now.AddMinutes(120), // Token expira em 2 horas
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
