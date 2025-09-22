using Microsoft.AspNetCore.Mvc;
using MeuProjeto.Models;
using MeuProjeto.Services;

namespace MeuProjeto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly SupabaseService _supabase;

        public AuthController(SupabaseService supabase)
        {
            _supabase = supabase;
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

            if (usuario == null || usuario.Senha != dto.Senha)
                return Unauthorized("Credenciais inválidas.");

            var usuarioDto = new UsuarioDto
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Turma = usuario.Turma,
                Email = usuario.Email
            };

            return Ok(usuarioDto);
        }
    }
}
