import "../styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Poyo Learning",
  description: "Hands-on learning cards generated from books"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-8">
          <header className="pb-8">
            <h1 className="text-3xl font-bold">Poyo Hands-on Reader</h1>
            <p className="text-sm text-slate-300">
              Upload textbook pages and learn with interactive cards.
            </p>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="pt-8 text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Poyo Labs
          </footer>
        </div>
      </body>
    </html>
  );
}
