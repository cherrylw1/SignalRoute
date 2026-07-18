import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  title: string;
  date: string;
  description: string;
  slug: string;
  content: string;
  readingMinutes: number;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const fileSlug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: data.slug || fileSlug,
        content,
        title: data.title || '',
        date: data.date || '',
        description: data.description || '',
        readingMinutes: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220)),
      } as BlogPost;
    });

  // Sort posts by date descending
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return null;
    }

    // List all files in the directory to match slug in frontmatter or filename
    const fileNames = fs.readdirSync(postsDirectory);
    for (const fileName of fileNames) {
      if (fileName.endsWith('.md') || fileName.endsWith('.mdx')) {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const fileSlug = fileName.replace(/\.mdx?$/, '');
        const postSlug = data.slug || fileSlug;

        if (postSlug === slug) {
          return {
            slug: postSlug,
            content,
            title: data.title || '',
            date: data.date || '',
            description: data.description || '',
            readingMinutes: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220)),
          } as BlogPost;
        }
      }
    }
    return null;
  } catch {
    return null;
  }
}
