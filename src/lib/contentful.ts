// Contentful Headless CMS utility

const SPACE_ID = import.meta.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = import.meta.env.CONTENTFUL_ACCESS_TOKEN;
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`;

// ===== 型定義 =====

export interface ContentfulAsset {
  sys: { id: string };
  fields: {
    title: string;
    file: {
      url: string;
      details: { image?: { width: number; height: number } };
      contentType: string;
    };
  };
}

export interface ContentfulAuthor {
  sys: { id: string };
  fields: {
    internalName: string;
    name: string;
    avatar?: ContentfulAsset;
  };
}

export interface ContentfulPost {
  sys: { id: string; createdAt: string; updatedAt: string };
  fields: {
    internalName: string;
    slug: string;
    title: string;
    shortDescription?: string;
    featuredImage: ContentfulAsset;
    publishedDate: string;
    author?: ContentfulAuthor;
    content: any;
    relatedBlogPosts?: ContentfulPost[];
  };
}

interface ContentfulResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
  includes?: {
    Asset?: ContentfulAsset[];
    Entry?: any[];
  };
}

// ===== API 関数 =====

async function fetchContentful<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<ContentfulResponse<T>> {
  const searchParams = new URLSearchParams({
    access_token: ACCESS_TOKEN,
    ...params,
  });
  const res = await fetch(`${BASE_URL}${endpoint}?${searchParams.toString()}`);
  if (!res.ok) throw new Error(`Contentful API error: ${res.status}`);
  return res.json();
}

function resolveAsset(assetId: string, includes?: ContentfulResponse<any>["includes"]): ContentfulAsset | undefined {
  return includes?.Asset?.find((a: any) => a.sys.id === assetId);
}

function resolveEntry(entryId: string, includes?: ContentfulResponse<any>["includes"]): any {
  return includes?.Entry?.find((e: any) => e.sys.id === entryId);
}

function resolvePost(item: any, includes?: ContentfulResponse<any>["includes"]): ContentfulPost {
  const fields = { ...item.fields };

  // featuredImage
  if (fields.featuredImage?.sys?.id) {
    fields.featuredImage = resolveAsset(fields.featuredImage.sys.id, includes) ?? fields.featuredImage;
  }

  // author
  if (fields.author?.sys?.id) {
    const authorEntry = resolveEntry(fields.author.sys.id, includes);
    if (authorEntry) {
      const authorFields = { ...authorEntry.fields };
      if (authorFields.avatar?.sys?.id) {
        authorFields.avatar = resolveAsset(authorFields.avatar.sys.id, includes) ?? authorFields.avatar;
      }
      fields.author = { sys: authorEntry.sys, fields: authorFields };
    }
  }

  // relatedBlogPosts
  if (Array.isArray(fields.relatedBlogPosts)) {
    fields.relatedBlogPosts = fields.relatedBlogPosts
      .map((ref: any) => {
        if (!ref?.sys?.id) return null;
        const entry = resolveEntry(ref.sys.id, includes);
        if (!entry) return null;
        const relatedFields = { ...entry.fields };
        if (relatedFields.featuredImage?.sys?.id) {
          relatedFields.featuredImage =
            resolveAsset(relatedFields.featuredImage.sys.id, includes) ??
            relatedFields.featuredImage;
        }
        return { sys: entry.sys, fields: relatedFields };
      })
      .filter(Boolean);
  }

  return { sys: item.sys, fields };
}

// 記事一覧取得
export async function getPosts(params?: {
  limit?: number;
  skip?: number;
}): Promise<{ posts: ContentfulPost[]; total: number }> {
  const data = await fetchContentful<any>("/entries", {
    content_type: "pageBlogPost",
    limit: String(params?.limit ?? 9),
    skip: String(params?.skip ?? 0),
    order: "-fields.publishedDate",
    include: "2",
  });

  const posts = data.items.map((item: any) => resolvePost(item, data.includes));
  return { posts, total: data.total };
}

// 記事詳細取得（slug で検索）
export async function getPost(slug: string): Promise<ContentfulPost | null> {
  const data = await fetchContentful<any>("/entries", {
    content_type: "pageBlogPost",
    "fields.slug": slug,
    include: "2",
  });
  if (!data.items.length) return null;
  return resolvePost(data.items[0], data.includes);
}

// 全スラッグ取得（getStaticPaths 用）
export async function getAllSlugs(): Promise<string[]> {
  const data = await fetchContentful<any>("/entries", {
    content_type: "pageBlogPost",
    limit: "1000",
    select: "fields.slug",
  });
  return data.items.map((item: any) => item.fields.slug);
}

// ===== ユーティリティ =====

export function assetUrl(url: string): string {
  if (!url) return "";
  return url.startsWith("//") ? `https:${url}` : url;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}