import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";

type HomeProps = {
  searchParams: { q?: string }
}

export default function Home({
  searchParams,
}: HomeProps) {
  return (
    <main className="px-4 py-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">SuperX Search</h1>
          <p className="text-gray-600">Search for relevant X posts on any topic to get insights and trends</p>
        </div>
        <div className="space-y-8">
          <SearchForm />
          <SearchResults searchParams={searchParams} />
        </div>
      </div>
    </main>
  );
}
