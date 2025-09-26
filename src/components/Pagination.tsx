import Link from "next/link";

type Props = {
  page: number;
  pageSize: number;
  total?: number | null;
  basePath: string;
  q?: string;
  type?: "rent" | "sale" | "";
};

function buildHref(basePath: string, page: number, q?: string, type?: string) {
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  if (type) p.set("type", type);
  if (page > 1) p.set("page", String(page));
  const qs = p.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export default function Pagination({ page, pageSize, total, basePath, q, type }: Props) {
  const totalNum = total ?? 0;
  const from = totalNum === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalNum);
  const hasPrev = page > 1;
  const hasNext = totalNum === 0 ? false : page * pageSize < totalNum;

  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="text-sm text-slate-400">
        {totalNum > 0 ? (
          <>Showing <span className="font-semibold text-slate-200">{from}</span>–<span className="font-semibold text-slate-200">{to}</span> of <span className="font-semibold text-slate-200">{totalNum}</span></>
        ) : (
          <>No results</>
        )}
      </div>
      <div className="flex gap-2">
        <Link
          aria-disabled={!hasPrev}
          className={`rounded-lg border px-3 py-1.5 text-sm ${hasPrev ? "hover:bg-slate-50 bg-white" : "pointer-events-none opacity-50 bg-white"}`}
          href={buildHref("/browse", page - 1, q, type)}
        >
          ← Prev
        </Link>
        <Link
          aria-disabled={!hasNext}
          className={`rounded-lg border px-3 py-1.5 text-sm ${hasNext ? "hover:bg-slate-50 bg-white" : "pointer-events-none opacity-50 bg-white"}`}
          href={buildHref("/browse", page + 1, q, type)}
        >
          Next →
        </Link>
      </div>
    </div>
  );
}
