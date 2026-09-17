import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { slugify } from "./utils";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  readingTime: string;
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface PostDetail extends PostMetadata {
  content: string;
  headings: HeadingItem[];
}

function extractHeadings(content: string): HeadingItem[] {
  const headingLines = content.split("\n").filter((line) => line.startsWith("##"));
  return headingLines.map((line) => {
    const match = line.match(/^(#{2,4})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim().replace(/[*_`]/g, "");
      return {
        level,
        text,
        id: slugify(text),
      };
    }
    return {
      level: 2,
      text: line.replace(/^#+\s+/, ""),
      id: slugify(line),
    };
  });
}

export function getAllPosts(): PostMetadata[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date ? new Date(data.date).toISOString().split("T")[0] : "2024-01-01",
        tags: Array.isArray(data.tags) ? data.tags : [],
        published: data.published !== false,
        readingTime: stats.text,
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): PostDetail | null {
  const extensions = [".mdx", ".md"];
  let fullPath = "";

  for (const ext of extensions) {
    const p = path.join(postsDirectory, `${slug}${ext}`);
    if (fs.existsSync(p)) {
      fullPath = p;
      break;
    }
  }

  if (!fullPath) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);
  const headings = extractHeadings(content);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date ? new Date(data.date).toISOString().split("T")[0] : "2024-01-01",
    tags: Array.isArray(data.tags) ? data.tags : [],
    published: data.published !== false,
    readingTime: stats.text,
    content,
    headings,
  };
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
