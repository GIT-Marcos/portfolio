import type { APIRoute } from 'astro';

const allowedSearchCrawlers = [
  'Googlebot',
  'Googlebot-Image',
  'Bingbot',
  'DuckDuckBot',
  'Slurp',
  'YandexBot',
  'Baiduspider',
];

const socialPreviewCrawlers = [
  'facebookexternalhit',
  'Facebot',
  'LinkedInBot',
  'Twitterbot',
  'Slackbot',
  'Discordbot',
];

const blockedAiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'Claude-Web',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'Amazonbot',
  'CCBot',
  'Bytespider',
  'cohere-ai',
  'MistralAI-User',
  'Diffbot',
];

const buildGroup = (userAgent: string, rule: 'allow' | 'disallow') => [
  `User-agent: ${userAgent}`,
  `${rule === 'allow' ? 'Allow' : 'Disallow'}: /`,
  '',
];

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    return new Response('Site URL is not configured.\n', {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const sitemapURL = new URL('sitemap-index.xml', site).href;
  const lines = [
    '# Common search crawlers are allowed; unknown crawlers are denied.',
    'User-agent: *',
    'Disallow: /',
    '',
    ...allowedSearchCrawlers.flatMap((userAgent) => buildGroup(userAgent, 'allow')),
    ...socialPreviewCrawlers.flatMap((userAgent) => buildGroup(userAgent, 'allow')),
    ...blockedAiCrawlers.flatMap((userAgent) => buildGroup(userAgent, 'disallow')),
    `Sitemap: ${sitemapURL}`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
