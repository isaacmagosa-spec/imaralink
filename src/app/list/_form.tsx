"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabaseBrowser";

type FormState = {
  title: string;
  type: "rent" | "sale";
  price: string;
  currency: string;
  bedrooms: string;
  bathrooms: string;
  city: string;
  area: string;
  description: string;
};

type UploadingImage = {
  file: File;
  name: string;
  uploading: boolean;
  url?: string;
  error?: string;
};

export default function ListForm() {
  const router = useRouter();
  const supabase = createSupabaseBrowser();

  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    title: "",
    type: "rent",
    price: "",
    currency: "KES",
    bedrooms: "",
    bathrooms: "",
    city: "",
    area: "",
    description: "",
  });

  const [images, setImages] = useState<UploadingImage[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSessionToken(data.session?.access_token ?? null);
    });
  }, [supabase]);

  const canSubmit = useMemo(() => {
    const priceNum = Number(form.price);
    return (
      form.title.trim().length >= 3 &&
      (form.type === "rent" || form.type === "sale") &&
      Number.isFinite(priceNum) &&
      priceNum > 0 &&
      form.currency.trim().length >= 3 &&
      !submitting
    );
  }, [form, submitting]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const selected = Array.from(files).slice(0, 10);
    const startIdx = images.length;

    setImages((prev) => [
      ...prev,
      ...selected.map((file) => ({ file, name: file.name, uploading: true })),
    ]);

    for (let i = 0; i < selected.length; i++) {
      const file = selected[i];
      const idx = startIdx + i;

      try {
        const user = (await supabase.auth.getUser()).data.user;
        const uid = user?.id || "anon";
        const ext = file.name.split(".").pop() || "jpg";
        const filename = `${crypto.randomUUID()}.${ext}`;
        const path = `${uid}/${filename}`;

        const { error: upErr } = await supabase.storage
          .from("listing-images")
          .upload(path, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type || "image/jpeg",
          });
        if (upErr) throw upErr;

        const { data } = supabase.storage.from("listing-images").getPublicUrl(path);
        const url = data.publicUrl;

        setImages((prev) =>
          prev.map((x, j) => (j === idx ? { ...x, uploading: false, url } : x))
        );
      } catch (e: any) {
        setImages((prev) =>
          prev.map((x, j) =>
            j === idx ? { ...x, uploading: false, error: e?.message ?? "Upload failed" } : x
          )
        );
      }
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        title: form.title.trim(),
        type: form.type,
        price: Number(form.price),
        currency: form.currency.trim().toUpperCase(),
        bedrooms: form.bedrooms === "" ? null : Math.max(0, Number(form.bedrooms)),
        bathrooms: form.bathrooms === "" ? null : Math.max(0, Number(form.bathrooms)),
        city: form.city.trim() || null,
        area: form.area.trim() || null,
        description: form.description.trim() || null,
        images: images.map((i) => i.url).filter(Boolean),
      };

      const res = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || `Failed (${res.status})`);
      }

      const j = await res.json();
      const id = j?.listing?.id;
      router.push(id ? `/listing/${id}` : "/browse");
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">List your property</h1>
      <p className="mt-1 text-slate-600">Add details and images. Fields marked * are required.</p>

      {error && (
        <div className="mt-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-red-800">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-5 rounded-2xl border border-slate-200/70 bg-white/80 p-5">
        <div>
          <label className="block text-sm font-medium text-slate-700">Title *</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="e.g. 2BR Apartment – Kileleshwa"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            required
            minLength={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Type *</label>
          <div className="mt-1 flex gap-3">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="rent"
                checked={form.type === "rent"}
                onChange={() => update("type", "rent")}
              />
              <span>Rent</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="sale"
                checked={form.type === "sale"}
                onChange={() => update("type", "sale")}
              />
              <span>Sale</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Price *</label>
            <input
              type="number"
              inputMode="decimal"
              min={1}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="15000"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Currency *</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 uppercase"
              placeholder="KES"
              value={form.currency}
              onChange={(e) => update("currency", e.target.value.toUpperCase())}
              required
              minLength={3}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Bedrooms</label>
            <input
              type="number"
              min={0}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="e.g. 2"
              value={form.bedrooms}
              onChange={(e) => update("bedrooms", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Bathrooms</label>
            <input
              type="number"
              min={0}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="e.g. 1"
              value={form.bathrooms}
              onChange={(e) => update("bathrooms", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">City</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="Nairobi"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Area</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="Kileleshwa"
              value={form.area}
              onChange={(e) => update("area", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            rows={4}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="Tell guests/buyers about the property…"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Images (up to 10)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="mt-1 block"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {!!images.length && (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {images.map((img, i) => (
                <div key={i} className="rounded-lg border p-2 text-xs">
                  <div className="truncate">{img.name}</div>
                  {img.uploading && <div className="text-slate-500">Uploading…</div>}
                  {img.url && (
                    <img
                      src={img.url}
                      alt=""
                      className="mt-1 h-24 w-full rounded-md object-cover"
                    />
                  )}
                  {img.error && <div className="text-red-600">{img.error}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
          >
            {submitting ? "Publishing…" : "Publish listing"}
          </button>
        </div>
      </form>
    </main>
  );
}
