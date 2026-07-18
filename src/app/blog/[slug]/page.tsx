import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { PageShell } from "@/components/page-shell";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";

interface BlogPostPageProps { params: { slug: string } }

export const dynamicParams = false;
export async function generateStaticParams() { return (await getAllBlogPosts()).map(post => ({ slug: post.slug })); }

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: "Field note not found" };
  return { title: post.title, description: post.description, alternates: { canonical: `/blog/${post.slug}` }, openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date } };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();
  marked.setOptions({ gfm: true });
  const htmlContent = await marked(post.content);
  return <PageShell><article className="article-shell"><Link href="/blog" className="article-back">All Field Notes</Link><header className="article-header"><time>{new Date(post.date).toLocaleDateString("en-US", {month:"long",day:"numeric",year:"numeric"})} · {post.readingMinutes} MIN READ</time><h1>{post.title}</h1><p>{post.description}</p></header><div className="blog-content" dangerouslySetInnerHTML={{__html: htmlContent}} /></article></PageShell>;
}
