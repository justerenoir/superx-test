import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'SuperX Search',
  description: 'Search for relevant X posts on any topic to get insights and trends',
}

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function Home({
  searchParams,
}: PageProps) {
  const params = await searchParams

  return (
    <main className="px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full max-w-2xl text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">SuperX Search</h1>
          <p className="text-gray-600">Search for relevant X posts on any topic to get insights and trends</p>
        </div>
        <div className="w-full max-w-2xl mb-8">
          <SearchForm />
        </div>
        <div className="w-full">
          <SearchResults searchParams={params} />
        </div>
      </div>
    </main>
  );
}
