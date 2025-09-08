using Microsoft.AspNetCore.Mvc;
using MeuProjeto.Models;
using MeuProjeto.Services;

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
                return BadRequest("As senhas não coincidem."); // 🔹 checagem extra

            var usuario = new Usuario
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Turma = dto.Turma,
                Senha = dto.Senha // ⚠️ depois vamos trocar por hash
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
