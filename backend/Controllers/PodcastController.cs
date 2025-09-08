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

            var podcast = new Podcast
            {
                Id = dto.Id,
                Titulo = dto.Titulo,
                Descricao = dto.Descricao
            };

            var result = await _supabase.Client.From<Podcast>().Insert(podcast);

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

        // 🔹 PUT - Atualizar podcast existente
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PodcastDto dto)
        {
            if (dto == null || id != dto.Id)
                return BadRequest("Dados inválidos para atualização.");

            // Buscar o podcast existente
            var existing = await _supabase.Client
                .From<Podcast>()
                .Where(p => p.Id == id)
                .Single();

            if (existing == null)
                return NotFound("Podcast não encontrado.");

            // Atualizar os campos
            existing.Titulo = dto.Titulo;
            existing.Descricao = dto.Descricao;

            var result = await _supabase.Client.From<Podcast>().Update(existing);

            var updated = result.Models.FirstOrDefault();
            if (updated == null) return BadRequest("Erro ao atualizar o podcast.");

            var updatedDto = new PodcastDto
            {
                Id = updated.Id,
                Titulo = updated.Titulo,
                Descricao = updated.Descricao
            };

            return Ok(updatedDto);
        }

        // 🔹 DELETE - Remover podcast
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _supabase.Client
                .From<Podcast>()
                .Where(p => p.Id == id)
                .Single();

            if (existing == null)
                return NotFound("Podcast não encontrado.");

            await _supabase.Client.From<Podcast>().Delete(existing);

            return Ok("Podcast excluído com sucesso!"); // 204
        }
    }
}
