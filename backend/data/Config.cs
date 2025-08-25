using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using dotenv.net;

namespace backend.data
{
        public static class Config
    {
        public static string SupabaseUrl { get; private set; }
        public static string SupabaseKey { get; private set; }

        static Config()
        {
            DotEnv.Load();
            SupabaseUrl = Environment.GetEnvironmentVariable("https://optsonslncwlgpibdlsx.supabase.co");
            SupabaseKey = Environment.GetEnvironmentVariable("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wdHNvbnNsbmN3bGdwaWJkbHN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MTQ5OTYsImV4cCI6MjA3MTM5MDk5Nn0.Roq6SoEnhidV5W6A_QH__Ijw5MFpzsKMfhKF3W6fCaA");
        }
    }
}