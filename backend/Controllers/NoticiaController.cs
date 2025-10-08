using Microsoft.AspNetCore.Mvc;
using MeuProjeto.Models;
using MeuProjeto.Services;
using backend.Models;
using backend.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NoticiaController : ControllerBase
    {
         private readonly SupabaseService _supabase;

        public NoticiaController(SupabaseService supabase)
        {
            _supabase = supabase;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _supabase.Client.From<Noticia>().Get();

            var dtos = result.Models.Select(p => new NoticiaDto
            {
                Id = p.Id,
                Titulo = p.Titulo,
                Descricao = p.Descricao,
                CapaUrl = p.CapaUrl,
            });

            return Ok(dtos);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] NoticiaDto dto)
        {
            if (dto == null)
                return BadRequest("Notícia inválida.");

            var noticia = new Noticia
            {
                Titulo = dto.Titulo,
                Descricao = dto.Descricao,
                CapaUrl = dto.CapaUrl,
            };

            var result = await _supabase.Client.From<Noticia>().Insert(noticia);
            var created = result.Models.FirstOrDefault();
            if (created == null) return BadRequest("Não foi possível criar a notícia.");

            var createdDto = new NoticiaDto
            {
                Id = created.Id,
                Titulo = created.Titulo,
                Descricao = created.Descricao,
                CapaUrl = created.CapaUrl
            };

            return Ok(createdDto);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] NoticiaDto dto)
        {
            if (dto == null || id != dto.Id)
                return BadRequest("Dados inválidos para atualização.");

            var existing = await _supabase.Client
                .From<Noticia>()
                .Where(p => p.Id == id)
                .Single();

            if (existing == null)
                return NotFound("Notícia não encontrada.");

            existing.Titulo = dto.Titulo;
            existing.Descricao = dto.Descricao;
            existing.CapaUrl = dto.CapaUrl;

            var result = await _supabase.Client.From<Noticia>().Update(existing);
            var updated = result.Models.FirstOrDefault();
            if (updated == null) return BadRequest("Erro ao atualizar a notícia.");

            var updatedDto = new NoticiaDto
            {
                Id = updated.Id,
                Titulo = updated.Titulo,
                Descricao = updated.Descricao,
                CapaUrl = updated.CapaUrl
            };

            return Ok(updatedDto);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _supabase.Client
                .From<Noticia>()
                .Where(p => p.Id == id)
                .Single();

            if (existing == null)
                return NotFound("Notícia não encontrada.");

            await _supabase.Client.From<Noticia>().Delete(existing);

            return Ok("Notícia excluída com sucesso!");
        }

        [HttpPost("upload")]
        [Authorize]
        public async Task<IActionResult> UploadNoticia(
            IFormFile? capa,
            [FromForm] string titulo,
            [FromForm] string descricao)
        {

            string? capaUrl = null;
            if (capa != null)
                capaUrl = await _supabase.UploadFileAsync(capa, "noticias", "capas");

            var noticia = new Noticia
            {
                Titulo = titulo,
                Descricao = descricao,
                CapaUrl = capaUrl
            };

            var result = await _supabase.Client.From<Noticia>().Insert(noticia);
            var created = result.Models.FirstOrDefault();

            if (created == null)
                return BadRequest("Erro ao criar a notícia.");

            // Retornar DTO para evitar problema de serialização
            var createdDto = new NoticiaDto
            {
                Id = created.Id,
                Titulo = created.Titulo,
                Descricao = created.Descricao,
                CapaUrl = created.CapaUrl
            };

            return Ok(createdDto);
        }
    }
}