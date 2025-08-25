using Microsoft.AspNetCore.Mvc;
using MeuProjeto.Models;
using MeuProjeto.Services;

namespace MeuProjeto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PodcastController : ControllerBase
    {
        private readonly SupabaseService _supabase;

        public PodcastController(SupabaseService supabase)
        {
            _supabase = supabase;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _supabase.Client.From<Podcast>().Get();

            // Mapear BaseModel para DTO
            var dtos = result.Models.Select(p => new PodcastDto
            {
                Id = p.Id,
                Titulo = p.Titulo,
                Descricao = p.Descricao
            });

            return Ok(dtos);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PodcastDto dto)
        {
            if (dto == null)
                return BadRequest("Podcast inválido.");

            // Mapear DTO para BaseModel
            var podcast = new Podcast
            {
                Id = dto.Id,
                Titulo = dto.Titulo,
                Descricao = dto.Descricao
            };

            var result = await _supabase.Client.From<Podcast>().Insert(podcast);

            // Retornar apenas o DTO limpo
            var created = result.Models.FirstOrDefault();
            if (created == null) return BadRequest("Não foi possível criar o podcast.");

            var createdDto = new PodcastDto
            {
                Id = created.Id,
                Titulo = created.Titulo,
                Descricao = created.Descricao
            };

            return Ok(createdDto);
        }
    }
}
