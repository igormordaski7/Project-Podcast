using Supabase;
using Supabase;
using System.IO;

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

        public async Task<string> UploadFileAsync(IFormFile file, string bucket, string folder)
        {
            var objectPath = $"{folder}/{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
            var tempPath = Path.GetTempFileName();

            try
            {
                // Copia o arquivo recebido para um arquivo temporário
                await using (var fs = new FileStream(tempPath, FileMode.Create))
                {
                    await file.CopyToAsync(fs);
                }

                // Faz o upload: (origem local, destino no bucket)
                await Client.Storage
                    .From(bucket)
                    .Upload(tempPath, objectPath, new Supabase.Storage.FileOptions { Upsert = true });

                // Retorna a URL pública
                return Client.Storage.From(bucket).GetPublicUrl(objectPath);
            }
            finally
            {
                if (File.Exists(tempPath))
                    File.Delete(tempPath); // limpa o temporário
            }
        }

    }
}
