import useBackground from "@/hooks/useBackground";
import { cn, formatNumber } from "@/lib/utils";

// We can filter image collections based on 3 category:
const collectionFilter = ["Unlocked", "Locked", "All"] as const;
export type TCollectionFilter = (typeof collectionFilter)[number];

// Header UI displayed on top of the images
export default function CollectionHeader({
  filter,
  setFilter,
}: {
  filter: TCollectionFilter;
  setFilter: React.Dispatch<React.SetStateAction<TCollectionFilter>>;
}) {
  const { backgroundQuery, backgroundData } = useBackground();

  // Total amount of background owned by the user.
  const totalOwned = backgroundData?.reduce(
    (count, background) => (background.owned ? count + 1 : count),
    0
  );

  // total backgrounds that exist the database (both owned and not)
  // Used to tell : (backgrounds the user has / the database's background pool)
  const totalBackgrounds = backgroundQuery.data?.length;

  return (
    <header className="flex justify-between items-center lg:flex-col lg:items-start lg:gap-8 ">
      <div>
        <div className="flex gap-4 sm:flex-col-reverse sm:w-fit">
          <h1 className="text-dark text-lg font-semibold">My Collection</h1>
          <div className="flex bg-accent px-4 py-1 rounded-lg text-white items-center justify-center gap-2 sm:w-fit">
            <i className="bx bx-trophy text-md"></i>
            <p>
              {formatNumber(totalOwned)} / {formatNumber(totalBackgrounds)}
            </p>
          </div>
        </div>
        <p className="mt-2 text-light">
          The backgrounds you have unlocked will appear here. Unlock new
          backgrounds by completing goals.
        </p>
      </div>
      <ul className="grid bg-white-soft rounded-lg py-2 px-2 grid-cols-3 max-w-[25rem] place-items-center gap-2">
        {collectionFilter.map((item) => {
          return (
            <li
              key={item}
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
