import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow">
        <h2 className="text-xl font-semibold">1. Upload book pages</h2>
        <p className="mt-2 text-sm text-slate-300">
          Drag & drop page images or PDF files to extract text via OCR.
        </p>
        <Link
          href="/upload"
          className="mt-6 inline-flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          Go to uploader
        </Link>
      </section>
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow">
        <h2 className="text-xl font-semibold">2. Study interactive cards</h2>
        <p className="mt-2 text-sm text-slate-300">
          Review summaries, ask contextual questions and answer quick quizzes.
        </p>
        <Link
          href="/cards"
          className="mt-6 inline-flex items-center rounded-lg border border-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/10"
        >
          View generated decks
        </Link>
      </section>
    </div>
  );
}
