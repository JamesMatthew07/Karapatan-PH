import { searchableCards } from "@/src/lib/content/loader";
import { SearchClient } from "@/src/components/search/SearchClient";

export default function SearchPage() {
  const index = searchableCards();
  return <SearchClient searchIndex={index} />;
}
