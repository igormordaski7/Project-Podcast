using Microsoft.AspNetCore.Mvc;
using MeuProjeto.Models;
using MeuProjeto.Services;
using BCrypt.Net; // 1. Importe o BCrypt

namespace MeuProjeto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly SupabaseService _supabase;

        public RegisterController(SupabaseService supabase)
        {
            _supabase = supabase;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (dto == null || string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Senha))
                return BadRequest("Dados inválidos.");

            if (dto.Senha != dto.ConfirmarSenha)
                return BadRequest("As senhas não coincidem.");

            // 2. Adicione uma verificação para ver se o usuário já existe
            var existingUser = await _supabase.Client
                .From<Usuario>()
                .Where(u => u.Email == dto.Email)
                .Get();

            if (existingUser.Models.Any())
            {
                return BadRequest("Este email já está em uso.");
            }

            var usuario = new Usuario
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Turma = dto.Turma,
                // 3. Faça o HASH da senha antes de salvar
                Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha)
            };

            var result = await _supabase.Client.From<Usuario>().Insert(usuario);
            var created = result.Models.FirstOrDefault();

            if (created == null)
                return BadRequest("Não foi possível registrar o usuário.");

            var createdDto = new UsuarioDto
            {
                Id = created.Id,
                Nome = created.Nome,
                Turma = created.Turma,
                Email = created.Email
            };

            return Ok(createdDto);
        }
    }
}
