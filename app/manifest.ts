import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Jordan Castiglioni Portfolio',
    short_name: 'Jordan Castiglioni',
    description:
      'Portfolio of Jordan Castiglioni, full stack developer and tech lead building production web applications, AI-enabled products and cloud delivery systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f5fb',
    theme_color: '#8f55ff',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}
