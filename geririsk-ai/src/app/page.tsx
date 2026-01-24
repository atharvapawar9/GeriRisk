export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900">GeriRisk AI</h1>
        <p className="mt-2 text-gray-600">
          Upload wearable CSV → store in Supabase → show dashboard insights.
        </p>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-800 font-medium">Week 1 Goal:</p>
          <ul className="mt-2 list-disc pl-6 text-gray-700">
            <li>Setup Next.js + Tailwind</li>
            <li>Setup Supabase Storage</li>
            <li>Upload CSV and store it</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
