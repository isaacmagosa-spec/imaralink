"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser, createSupabaseBrowser } from "@/lib/supabase/client";

export default function ListForm() {
  const router = useRouter();
  const supabase = (typeof supabaseBrowser === "function"
    ? supabaseBrowser
    : createSupabaseBrowser)();

  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);

    if (!file) {
      setMessage("Please choose a file before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const userRes = await supabase.auth.getUser();
      const uid = userRes.data.user?.id ?? "anon";

      const name = typeof file.name === "string" ? file.name : "";
      const ext = (name.includes(".") ? name.split(".").pop() : undefined)?.toLowerCase() || "jpg";
      const filename = `${crypto.randomUUID()}.${ext}`;
      const path = `${uid}/${filename}`;

      const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "uploads";
      const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: "3600",
        upsert: false
      });
      if (upErr) {
        setMessage(upErr.message);
        setSubmitting(false);
        return;
      }

      const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path);
      const publicUrl = pub?.publicUrl || "";

      // Local success handling (no function prop crossing Server→Client boundary)
      setMessage("Upload successful.");
      console.log("Uploaded:", { publicUrl, path });
      router.refresh();
    } catch (err: any) {
      setMessage(err?.message || "Unexpected error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">File</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.currentTarget.files?.[0] ?? null)}
          className="mt-1 block w-full text-sm"
        />
      </div>

      {message && <p className="text-sm">{message}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg px-4 py-2 bg-black text-white disabled:opacity-60"
      >
        {submitting ? "Uploading…" : "Submit"}
      </button>
    </form>
  );
}
