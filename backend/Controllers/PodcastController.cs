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
                Descricao = p.Descricao,
                AudioUrl = p.AudioUrl,
                CapaUrl = p.CapaUrl
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
                Titulo = dto.Titulo,
                Descricao = dto.Descricao,
                AudioUrl = dto.AudioUrl,
                CapaUrl = dto.CapaUrl
            };

            var result = await _supabase.Client.From<Podcast>().Insert(podcast);
            var created = result.Models.FirstOrDefault();
            if (created == null) return BadRequest("Não foi possível criar o podcast.");

            var createdDto = new PodcastDto
            {
                Id = created.Id,
                Titulo = created.Titulo,
                Descricao = created.Descricao,
                AudioUrl = created.AudioUrl,
                CapaUrl = created.CapaUrl
            };

            return Ok(createdDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PodcastDto dto)
        {
            if (dto == null || id != dto.Id)
                return BadRequest("Dados inválidos para atualização.");

            var existing = await _supabase.Client
                .From<Podcast>()
                .Where(p => p.Id == id)
                .Single();

            if (existing == null)
                return NotFound("Podcast não encontrado.");

            existing.Titulo = dto.Titulo;
            existing.Descricao = dto.Descricao;
            existing.AudioUrl = dto.AudioUrl;
            existing.CapaUrl = dto.CapaUrl;

            var result = await _supabase.Client.From<Podcast>().Update(existing);
            var updated = result.Models.FirstOrDefault();
            if (updated == null) return BadRequest("Erro ao atualizar o podcast.");

            var updatedDto = new PodcastDto
            {
                Id = updated.Id,
                Titulo = updated.Titulo,
                Descricao = updated.Descricao,
                AudioUrl = updated.AudioUrl,
                CapaUrl = updated.CapaUrl
            };

            return Ok(updatedDto);
        }

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

            return Ok("Podcast excluído com sucesso!");
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadPodcast(
            IFormFile audio,
            IFormFile? capa,
            [FromForm] string titulo,
            [FromForm] string descricao)
        {
            if (audio == null) return BadRequest("O áudio é obrigatório!");

            // Upload de arquivos
            var audioUrl = await _supabase.UploadFileAsync(audio, "podcasts", "audios");
            string? capaUrl = null;
            if (capa != null)
                capaUrl = await _supabase.UploadFileAsync(capa, "podcasts", "capas");

            // Criar podcast no banco
            var podcast = new Podcast
            {
                Titulo = titulo,
                Descricao = descricao,
                AudioUrl = audioUrl,
                CapaUrl = capaUrl
            };

            var result = await _supabase.Client.From<Podcast>().Insert(podcast);
            var created = result.Models.FirstOrDefault();

            if (created == null)
                return BadRequest("Erro ao criar o podcast.");

            // Retornar DTO para evitar problema de serialização
            var createdDto = new PodcastDto
            {
                Id = created.Id,
                Titulo = created.Titulo,
                Descricao = created.Descricao,
                AudioUrl = created.AudioUrl,
                CapaUrl = created.CapaUrl
            };

            return Ok(createdDto);
        }
    }
}
