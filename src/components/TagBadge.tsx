const tagColors: Record<string, string> = {
  react: "bg-sky-500/20 text-sky-700 dark:text-sky-300",
  "next.js": "bg-black/20 text-gray-800 dark:bg-white/20 dark:text-gray-200",
  nextjs: "bg-black/20 text-gray-800 dark:bg-white/20 dark:text-gray-200",
  typescript: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  javascript: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300",
  "node.js": "bg-green-500/20 text-green-700 dark:text-green-300",
  nodejs: "bg-green-500/20 text-green-700 dark:text-green-300",
  css: "bg-purple-500/20 text-purple-700 dark:text-purple-300",
  tailwind: "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300",
  "tailwind css": "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300",
  html: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
  python: "bg-yellow-600/20 text-yellow-800 dark:text-yellow-300",
  api: "bg-rose-500/20 text-rose-700 dark:text-rose-300",
  database: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  testing: "bg-lime-500/20 text-lime-700 dark:text-lime-300",
  devops: "bg-indigo-500/20 text-indigo-700 dark:text-indigo-300",
  git: "bg-red-500/20 text-red-700 dark:text-red-300",
  vue: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  nuxt: "bg-green-600/20 text-green-700 dark:text-green-300",
  laravel: "bg-red-500/20 text-red-700 dark:text-red-300",
  postgresql: "bg-blue-600/20 text-blue-700 dark:text-blue-300",
  mysql: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
  mongodb: "bg-green-500/20 text-green-700 dark:text-green-300",
  docker: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  aws: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
  graphql: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
  redux: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
};

function getTagColor(tag: string): string {
  const normalizedTag = tag.toLowerCase();
  return tagColors[normalizedTag] || "bg-primary/20 text-primary";
}

interface TagBadgeProps {
  tag: string;
  size?: "sm" | "md";
}

export function TagBadge({ tag, size = "sm" }: TagBadgeProps) {
  const sizeClasses = size === "md" ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs";

  return (
    <span
      className={`rounded-full font-medium ${sizeClasses} ${getTagColor(tag)}`}
    >
      {tag}
    </span>
  );
}
