import CollectionHeader, {
  TCollectionFilter,
} from "@/components/app/collection/CollectionHeader";
import CollectionImages from "@/components/app/collection/CollectionImages";
import { useState } from "react";

export default function Collection() {
  const [filter, setFilter] = useState<TCollectionFilter>("All");

  return (
    <main className="mx-4 mb-4 p-8 bg-white rounded-xl flex-1 h-full">
      <CollectionHeader filter={filter} setFilter={setFilter} />
      <CollectionImages filter={filter} />
    </main>
  );
}
