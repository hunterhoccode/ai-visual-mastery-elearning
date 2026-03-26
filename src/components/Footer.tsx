export default function Footer() {
  return (
    <footer className="mt-auto bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              AI
            </div>
            <div>
              <h3 className="font-bold">AI Visual Mastery</h3>
              <p className="text-sm text-gray-400">
                Complete Studio Suite Course
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            &copy; 2025 AI Visual Mastery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
