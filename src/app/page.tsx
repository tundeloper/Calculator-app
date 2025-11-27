import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4">
      <main className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-white mb-4">Calculator</h1>
        <Calculator />
      </main>
    </div>
  );
}
