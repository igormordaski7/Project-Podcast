namespace MeuProjeto.Models
{
    public class RegisterDto
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Turma { get; set; }
        public string Senha { get; set; }
        public string ConfirmarSenha { get; set; } // 🔹 novo campo
    }
}
