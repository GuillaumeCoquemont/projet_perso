export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold">Welcome to My Project 🚀</h1>
      <ul className="mt-6 space-y-4">
        <li><a href="/plants" className="text-blue-600 hover:underline">🌱 Plants</a></li>
        <li><a href="/recipes" className="text-blue-600 hover:underline">🍲 Recipes</a></li>
        <li><a href="/applications" className="text-blue-600 hover:underline">📦 Applications</a></li>
      </ul>
    </main>
  );
}