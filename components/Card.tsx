import { ReactNode } from "react";

type CardProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export default function Card({ title, subtitle, children }: CardProps) {
  return (
    <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 shadow-sm p-6 hover:bg-white/10 transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <p className="text-sm text-slate-300 mt-1">{subtitle}</p>}
      {children && <div className="mt-4 text-slate-200">{children}</div>}
    </div>
  );
}