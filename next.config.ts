import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurar variáveis de ambiente para build
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
  },

  // Configurações experimentais
  experimental: {
    // Otimizar imports de pacotes
    optimizePackageImports: ['@supabase/supabase-js', '@supabase/ssr'],
  }
};

export default nextConfig;