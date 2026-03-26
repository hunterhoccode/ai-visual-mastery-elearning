"use client";

import { useState, useCallback } from "react";
import { Languages, Loader2 } from "lucide-react";

export default function TranslateToggle() {
  const [isVietnamese, setIsVietnamese] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [originalHtml, setOriginalHtml] = useState<string | null>(null);

  const translateContent = useCallback(async () => {
    const proseEl = document.querySelector(".prose");
    if (!proseEl) return;

    if (isVietnamese) {
      if (originalHtml) {
        proseEl.innerHTML = originalHtml;
      }
      setIsVietnamese(false);
      return;
    }

    setOriginalHtml(proseEl.innerHTML);
    setIsLoading(true);

    try {
      // Collect all text nodes from all elements
      const walker = document.createTreeWalker(
        proseEl,
        NodeFilter.SHOW_TEXT,
        null
      );

      const textNodes: { node: Text; text: string }[] = [];
      let node: Text | null;
      while ((node = walker.nextNode() as Text | null)) {
        const text = node.textContent?.trim();
        if (text && text.length > 1) {
          textNodes.push({ node, text });
        }
      }

      // Batch translate
      const batchSize = 30;
      for (let i = 0; i < textNodes.length; i += batchSize) {
        const batch = textNodes.slice(i, i + batchSize);
        const texts = batch.map((b) => b.text);

        const queryParams = texts
          .map((t) => `q=${encodeURIComponent(t)}`)
          .join("&");
        const url = `https://translate.googleapis.com/translate_a/t?client=gtx&sl=en&tl=vi&${queryParams}`;

        const res = await fetch(url);
        const data = await res.json();

        let translations: string[];
        if (Array.isArray(data)) {
          if (texts.length === 1) {
            translations = [Array.isArray(data[0]) ? data[0][0] : String(data[0])];
          } else {
            translations = data.map((d: string | string[]) =>
              Array.isArray(d) ? d[0] : String(d)
            );
          }
        } else {
          translations = [String(data)];
        }

        batch.forEach((item, idx) => {
          if (translations[idx]) {
            item.node.textContent = translations[idx];
          }
        });
      }

      setIsVietnamese(true);
    } catch {
      if (originalHtml) {
        proseEl.innerHTML = originalHtml;
      }
      setOriginalHtml(null);
      alert("Dịch tự động thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  }, [isVietnamese, originalHtml]);

  return (
    <button
      onClick={translateContent}
      disabled={isLoading}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
        isVietnamese
          ? "bg-primary text-black"
          : "text-muted border border-border hover:border-primary/30 hover:text-primary"
      } ${isLoading ? "opacity-70 cursor-wait" : "cursor-pointer"}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Translating...
        </>
      ) : (
        <>
          <Languages className="w-4 h-4" />
          {isVietnamese ? "English" : "Tiếng Việt"}
        </>
      )}
    </button>
  );
}
