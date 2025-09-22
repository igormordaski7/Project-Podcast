using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace backend.Models
{
    [Table("noticias")]
    public class Noticia : BaseModel
    {
        [PrimaryKey("id", false)]
        public int Id { get; set; }

        [Column("titulo")]
        public string Titulo { get; set; }

        [Column("descricao")]
        public string Descricao { get; set; }

        [Column("capa_url")]
        public string? CapaUrl { get; set; }
    }
}
