import Link from "next/link";
import { categorySlug, postCategories } from "@/data/news";
import { cn } from "@/lib/utils";

const pill = "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold";
const on = "border-primary-700 bg-primary-700 text-white";
const off = "border-sand-300 bg-white hover:bg-primary-50";

export function CategoryNav({ active }: { active?: string }) {
  return (
    <nav aria-label="News categories" className="mb-10">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link href="/news" aria-current={!active ? "page" : undefined} className={cn(pill, !active ? on : off)}>
            All
          </Link>
        </li>
        {postCategories.map((c) => (
          <li key={c}>
            <Link
              href={`/news/category/${categorySlug(c)}`}
              aria-current={active === categorySlug(c) ? "page" : undefined}
              className={cn(pill, active === categorySlug(c) ? on : off)}
            >
              {c}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
