// WordPress Headless CMS utility
// WP REST API から記事データを取得する

const WP_API_BASE = import.meta.env.WP_API_BASE ?? "http://localhost:8080/wp-json/wp/v2";

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  categories: number[];
  tags: number[];
  _links: {
    "wp:featuredmedia"?: Array<{ href: string }>;
  };
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    sizes: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WPTerm {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

export async function getPosts(params?: {
  per_page?: number;
  page?: number;
  categories?: number[];
  tags?: number[];
  search?: string;
}): Promise<WPPost[]> {
  const searchParams = new URLSearchParams();
  searchParams.set("per_page", String(params?.per_page ?? 10));
  searchParams.set("page", String(params?.page ?? 1));
  if (params?.categories?.length) {
    searchParams.set("categories", params.categories.join(","));
  }
  if (params?.tags?.length) {
    searchParams.set("tags", params.tags.join(","));
  }
  if (params?.search) {
    searchParams.set("search", params.search);
  }

  const res = await fetch(`${WP_API_BASE}/posts?${searchParams.toString()}`);
  if (!res.ok) throw new Error(`WP API error: ${res.status}`);
  return res.json() as Promise<WPPost[]>;
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const res = await fetch(`${WP_API_BASE}/posts?slug=${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error(`WP API error: ${res.status}`);
  const posts: WPPost[] = await res.json();
  return posts[0] ?? null;
}

export async function getFeaturedMedia(mediaId: number): Promise<WPMedia | null> {
  if (!mediaId) return null;
  const res = await fetch(`${WP_API_BASE}/media/${mediaId}`);
  if (!res.ok) return null;
  return res.json() as Promise<WPMedia>;
}

export async function getCategories(): Promise<WPTerm[]> {
  const res = await fetch(`${WP_API_BASE}/categories?per_page=100&hide_empty=true`);
  if (!res.ok) throw new Error(`WP API error: ${res.status}`);
  return res.json() as Promise<WPTerm[]>;
}

export async function getTags(): Promise<WPTerm[]> {
  const res = await fetch(`${WP_API_BASE}/tags?per_page=100&hide_empty=true`);
  if (!res.ok) throw new Error(`WP API error: ${res.status}`);
  return res.json() as Promise<WPTerm[]>;
}

export async function getCategoryBySlug(slug: string): Promise<WPTerm | null> {
  const res = await fetch(`${WP_API_BASE}/categories?slug=${encodeURIComponent(slug)}`);
  if (!res.ok) return null;
  const terms: WPTerm[] = await res.json();
  return terms[0] ?? null;
}

export async function getTagBySlug(slug: string): Promise<WPTerm | null> {
  const res = await fetch(`${WP_API_BASE}/tags?slug=${encodeURIComponent(slug)}`);
  if (!res.ok) return null;
  const terms: WPTerm[] = await res.json();
  return terms[0] ?? null;
}

// HTML を plain text に変換（excerpt 表示用）
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&hellip;/g, "…").trim();
}

// 日付フォーマット（日本語）
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}