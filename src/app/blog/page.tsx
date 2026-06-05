import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog - Churnaut",
  description: "Explore deep-dives, playbooks, and strategies for revenue personalization, dynamic routing, and B2B pipeline intelligence.",
};

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-16">
      {/* Blog Hero Section */}
      <div className="flex flex-col gap-4 max-w-3xl text-left">
        <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase">
          Churnaut Insights
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Pipeline Intelligence & Personalization Blog
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Deep-dives, playbooks, and strategies to turn every outbound link into a personalized landing experience and keep every deal moving.
        </p>
      </div>

      {/* Blog Posts Grid */}
      {posts.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-slate-200 rounded-3xl">
          <p className="text-slate-500">No blog posts found. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex-grow"
            >
              <div className="flex flex-col gap-4">
                <div className="text-xs text-slate-500 font-medium">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex items-center gap-1.5 text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Read Article &rarr;
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
