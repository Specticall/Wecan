import useBackground from "@/hooks/useBackground";
import { cn, formatNumber } from "@/lib/utils";

const collectionFilter = ["Unlocked", "Locked", "All"] as const;
export type TCollectionFilter = (typeof collectionFilter)[number];

export default function CollectionHeader({
  filter,
  setFilter,
}: {
  filter: TCollectionFilter;
  setFilter: React.Dispatch<React.SetStateAction<TCollectionFilter>>;
}) {
  const { backgroundQuery, backgroundData } = useBackground();

  const totalOwned = backgroundData?.reduce(
    (count, background) => (background.owned ? count + 1 : count),
    0
  );

  const totalBackgrounds = backgroundQuery.data?.length;

  return (
    <header className="flex justify-between items-center">
      <div>
        <div className="flex gap-4">
          <h1 className="text-dark text-lg font-semibold">My Collection</h1>
          <div className="flex bg-accent px-4 py-1 rounded-lg text-white items-center justify-center gap-2">
            <i className="bx bx-trophy text-md"></i>
            <p>
              {formatNumber(totalOwned)} / {formatNumber(totalBackgrounds)}
            </p>
          </div>
        </div>
        <p className="mt-2 text-light">
          The backgrounds you have unlocked will appear here.
        </p>
      </div>
      <ul className="grid bg-white-soft rounded-lg py-2 px-2 grid-cols-3 max-w-[25rem] place-items-center gap-2">
        {collectionFilter.map((item) => {
          return (
            <li
              className={cn(
                "cursor-pointer transition-all duration-200 w-full h-full flex items-center justify-center py-2 px-4 rounded-md",
                item === filter ? "bg-accent text-white" : "hover:bg-slate-200"
              )}
              onClick={() => setFilter(item)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </header>
  );
}
