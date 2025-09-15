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
            InitializeAsync().Wait(); // Inicializa o Supabase client
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
                // Copia para arquivo temporário
                await using (var fs = new FileStream(tempPath, FileMode.Create))
                {
                    await file.CopyToAsync(fs);
                }

                // Upload no storage
                await Client.Storage
                    .From(bucket)
                    .Upload(tempPath, objectPath, new Supabase.Storage.FileOptions { Upsert = true });

                // Retorna a URL pública
                return Client.Storage.From(bucket).GetPublicUrl(objectPath);
            }
            finally
            {
                if (File.Exists(tempPath))
                    File.Delete(tempPath);
            }
        }

        public async Task DeleteFileAsync(string fileUrl, string bucket)
        {
            if (string.IsNullOrEmpty(fileUrl))
                return;

            // A URL pública geralmente tem este formato:
            // https://<project>.supabase.co/storage/v1/object/public/{bucket}/{folder}/arquivo.ext
            // Precisamos remover até o nome do bucket e pegar apenas o "folder/arquivo.ext"

            var uri = new Uri(fileUrl);
            var segments = uri.AbsolutePath.Split("/storage/v1/object/public/");

            if (segments.Length < 2)
                return;

            // Caminho relativo dentro do bucket
            var relativePath = segments[1].Substring(bucket.Length + 1); 
            // Exemplo: "audios/arquivo.mp3"

            var storage = Client.Storage.From(bucket);
            await storage.Remove(new List<string> { relativePath });
        }
    }
}
