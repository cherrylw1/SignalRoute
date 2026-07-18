import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.churnaut.com";
  const posts = await getAllBlogPosts();
  const routes = ["", "/product", "/scout", "/pricing", "/about", "/careers", "/blog", "/privacy", "/terms"];
  return [...routes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date("2026-07-18"), changeFrequency: route === "" || route === "/blog" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : route === "/privacy" || route === "/terms" ? .3 : .8 })), ...posts.map(post => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified: new Date(post.date), changeFrequency: "monthly" as const, priority: .7 }))];
}
