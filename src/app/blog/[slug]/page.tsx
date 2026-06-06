import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found - Churnaut",
      description: "The requested blog post was not found on Churnaut.",
    };
  }

  return {
    title: `${post.title} - Churnaut Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Parse markdown content to HTML
  marked.setOptions({ gfm: true });
  const htmlContent = await marked(post.content);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-8">
      {/* Back link */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          &larr; Back to Blog
        </Link>
      </div>

      {/* Post Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-8 text-left">
        <div className="text-sm text-slate-500 font-semibold">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="text-lg md:text-xl text-slate-500 leading-relaxed italic">
          {post.description}
        </p>
      </div>

      {/* Render Markdown HTML content */}
      <article
        className="blog-content w-full text-left"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
