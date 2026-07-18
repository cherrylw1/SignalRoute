import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Field Notes",
  description: "Practical field notes on deterministic website personalization, outbound conversion and evidence-grounded pipeline intelligence.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();
  return <PageShell><section className="page-hero blog-hero"><div className="page-hero-inner"><p className="eyebrow">CHURNAUT FIELD NOTES</p><h1 className="display">Ideas for sales teams<br />who pay <em>attention.</em></h1><p className="lede">Playbooks and honest analysis on signal-based personalization, known-prospect intent and the deals that quietly drift.</p></div></section><section className="section-pad"><div className="blog-grid">{posts.map(post => <Link href={`/blog/${post.slug}`} className="blog-card" key={post.slug}><time>{new Date(post.date).toLocaleDateString("en-US", {month:"long",day:"numeric",year:"numeric"})} · {post.readingMinutes} min</time><h2>{post.title}</h2><p>{post.description}</p><span className="read-more">Read field note →</span></Link>)}</div></section></PageShell>;
}
