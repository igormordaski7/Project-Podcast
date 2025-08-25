using Supabase;

namespace MeuProjeto.Services
{
    public class SupabaseService
    {
        public Client Client { get; private set; }

        public SupabaseService(IConfiguration configuration)
        {
            var url = configuration["Supabase:Url"];
            var key = configuration["Supabase:Key"];

            Client = new Client(url, key);
            InitializeAsync().Wait(); // Para garantir inicialização na criação do singleton
        }

        private async Task InitializeAsync()
        {
            await Client.InitializeAsync();
        }
    }
}
