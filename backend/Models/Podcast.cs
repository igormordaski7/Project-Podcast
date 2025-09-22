using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace MeuProjeto.Models
{
    [Table("podcasts")]
    public class Podcast : BaseModel
    {
        [PrimaryKey("id", false)]
        public int Id { get; set; }

        [Column("titulo")]
        public string Titulo { get; set; }

        [Column("descricao")]
        public string Descricao { get; set; }

        [Column("capa_url")]
        public string? CapaUrl { get; set; }

        [Column("audio_url")]
        public string? AudioUrl { get; set; }
    }
}
 