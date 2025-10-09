using Microsoft.AspNetCore.Mvc;
using MeuProjeto.Models;
using MeuProjeto.Services;
using Microsoft.AspNetCore.Authorization;

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

        // GET: /api/podcast
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
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

                return Ok(new { podcasts = dtos });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar podcasts", error = ex.Message });
            }
        }

        // POST: /api/podcast
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] PodcastDto dto)
        {
            if (dto == null)
                return BadRequest(new { message = "Podcast inválido." });

            try
            {
                var podcast = new Podcast
                {
                    Titulo = dto.Titulo,
                    Descricao = dto.Descricao,
                    AudioUrl = dto.AudioUrl,
                    CapaUrl = dto.CapaUrl
                };

                var result = await _supabase.Client.From<Podcast>().Insert(podcast);
                var created = result.Models.FirstOrDefault();
                if (created == null) return BadRequest(new { message = "Não foi possível criar o podcast." });

                var createdDto = new PodcastDto
                {
                    Id = created.Id,
                    Titulo = created.Titulo,
                    Descricao = created.Descricao,
                    AudioUrl = created.AudioUrl,
                    CapaUrl = created.CapaUrl
                };

                return Ok(new { message = "Podcast criado com sucesso!", podcast = createdDto });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao criar podcast", error = ex.Message });
            }
        }

        // PUT: /api/podcast/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] PodcastDto dto)
        {
            if (dto == null || id != dto.Id)
                return BadRequest(new { message = "Dados inválidos para atualização." });

            try
            {
                var existing = await _supabase.Client
                    .From<Podcast>()
                    .Where(p => p.Id == id)
                    .Single();

                if (existing == null)
                    return NotFound(new { message = "Podcast não encontrado." });

                existing.Titulo = dto.Titulo;
                existing.Descricao = dto.Descricao;
                existing.AudioUrl = dto.AudioUrl;
                existing.CapaUrl = dto.CapaUrl;

                var result = await _supabase.Client.From<Podcast>().Update(existing);
                var updated = result.Models.FirstOrDefault();
                if (updated == null) return BadRequest(new { message = "Erro ao atualizar o podcast." });

                var updatedDto = new PodcastDto
                {
                    Id = updated.Id,
                    Titulo = updated.Titulo,
                    Descricao = updated.Descricao,
                    AudioUrl = updated.AudioUrl,
                    CapaUrl = updated.CapaUrl
                };

                return Ok(new { message = "Podcast atualizado com sucesso!", podcast = updatedDto });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao atualizar podcast", error = ex.Message });
            }
        }

        // DELETE: /api/podcast/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var existing = await _supabase.Client
                    .From<Podcast>()
                    .Where(p => p.Id == id)
                    .Single();

                if (existing == null)
                    return NotFound(new { message = "Podcast não encontrado." });

                // Deletar arquivos do storage
                if (!string.IsNullOrEmpty(existing.AudioUrl))
                {
                    await _supabase.DeleteFileAsync(existing.AudioUrl, "podcasts");
                }

                if (!string.IsNullOrEmpty(existing.CapaUrl))
                {
                    await _supabase.DeleteFileAsync(existing.CapaUrl, "podcasts");
                }

                // Deletar registro
                await _supabase.Client.From<Podcast>().Delete(existing);

                return Ok(new { message = "Podcast e arquivos excluídos com sucesso!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao excluir podcast", error = ex.Message });
            }
        }

        // POST: /api/podcast/upload
        [HttpPost("upload")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UploadPodcast(
            IFormFile audio,
            IFormFile? capa,
            [FromForm] string titulo,
            [FromForm] string descricao)
        {
            if (audio == null)
                return BadRequest(new { message = "O áudio é obrigatório!" });

            try
            {
                // Upload arquivos
                var audioUrl = await _supabase.UploadFileAsync(audio, "podcasts", "audios");
                string? capaUrl = null;
                if (capa != null)
                    capaUrl = await _supabase.UploadFileAsync(capa, "podcasts", "capas");

                // Criar podcast
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
                    return BadRequest(new { message = "Erro ao criar o podcast." });

                var createdDto = new PodcastDto
                {
                    Id = created.Id,
                    Titulo = created.Titulo,
                    Descricao = created.Descricao,
                    AudioUrl = created.AudioUrl,
                    CapaUrl = created.CapaUrl
                };

                return Ok(new { message = "Podcast criado com sucesso!", podcast = createdDto });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao fazer upload do podcast", error = ex.Message });
            }
        }
    }
}