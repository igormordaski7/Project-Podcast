using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace MeuProjeto.Models
{
    [Table("usuarios")]
    public class Usuario : BaseModel
    {
        [PrimaryKey("id", false)]
        public int Id { get; set; }

        [Column("nome")]
        public string Nome { get; set; }

        [Column("turma")]
        public string Turma { get; set; }

        [Column("email")]
        public string Email { get; set; }

        [Column("senha")]
        public string Senha { get; set; }

        [Column("role")]
        public string Role { get; set; }

    }
}
