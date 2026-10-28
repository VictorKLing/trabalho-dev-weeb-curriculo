import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/sistema/paginas/curriculos",
        destination: "/curriculos/visualizar",
        permanent: false,
      },
      {
        source: "/sistema/paginas/curriculos/novo",
        destination: "/curriculos/cadastrar",
        permanent: false,
      },
      {
        source: "/sistema/paginas/curriculos/:id",
        destination: "/curriculos/visualizar/:id",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/curriculos/visualizar",
        destination: "/sistema/paginas/curriculos",
      },
      {
        source: "/curriculos/visualizar/:id",
        destination: "/sistema/paginas/curriculos/:id",
      },
      {
        source: "/curriculos/cadastrar",
        destination: "/sistema/paginas/curriculos/novo",
      },
    ];
  },
};

export default nextConfig;
