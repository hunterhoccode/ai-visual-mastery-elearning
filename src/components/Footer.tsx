export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-black font-extrabold text-[10px]">AI</div>
            <span className="text-xs font-bold text-white">AI Visual Mastery</span>
          </div>
          <p className="text-[10px] text-muted">&copy; 2025 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
