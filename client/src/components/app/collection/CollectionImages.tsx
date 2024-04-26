import LoadingSpinner from "@/components/general/loadingSpinner";
import useBackground from "@/hooks/useBackground";
import { cn } from "@/lib/utils";
import { TCollectionFilter } from "./CollectionHeader";
import { useUser } from "@/context/UserContext";

const FADE_BG =
  "linear-gradient(0deg, rgba(0,0,0,0.9) 1%, rgba(255,255,255,0) 60%)";

const getTier = (tier: 1 | 2 | 3) => {
  switch (tier) {
    case 1:
      return {
        tier: "Tier I",
        color: "rgb(42 157 143)",
      };
    case 2:
      return {
        tier: "Tier II",
        color: "rgb(244 162 97)",
      };
    case 3:
      return {
        tier: "Tier III",
        color: "rgb(231 111 81)",
      };
  }
};

function createFilterFn<T extends { owned: boolean }>() {
  return {
    All: (item: T) => item,
    Locked: (item: T) => !item.owned,
    Unlocked: (item: T) => item.owned,
  };
}

export default function CollectionImages({
  filter,
}: {
  filter: TCollectionFilter;
}) {
  const { backgroundData, selectMutation } = useBackground();

  // Getting User Query from the cache (instead of creating one)
  const { userQuery } = useUser();

  if (!backgroundData) return;

  // get filter function (used in `.filter()`)  based on the passed in `filter` prop. Later on this function will be used to filter things the user wants to be displayed on the screen. We're doing a function call here to satisfy some typescript generic stuff.
  const selectedFilterFn = createFilterFn()[filter];

  return (
    <ul className="grid grid-cols-3 gap-8 bg-white-soft p-6 rounded-lg mt-8">
      {/* Filter used Here VVVVVVVVV */}
      {backgroundData.filter(selectedFilterFn).map((background) => {
        const { tier, color: tierColor } = getTier(background.tier);
        const isChangingImage =
          selectMutation.context?.backgroundId === background.id &&
          (selectMutation.isLoading || userQuery.isRefetching);

        const handleSelect = () => {
          if (background.selected) return;
          selectMutation.mutate(background.id);
        };

        return (
          <li
            className={cn(
              "h-[20rem] rounded-lg overflow-hidden relative group cursor-pointer",
              background.owned ? "" : "grayscale"
            )}
            onClick={handleSelect}
          >
            {isChangingImage ? (
              <div className="absolute inset-0 bg-black/70 z-30 flex items-center justify-center">
                <LoadingSpinner
                  size={"xl"}
                  className="relative z-20"
                  color="white"
                />
              </div>
            ) : (
              <>
                <div className="absolute inset-0 z-10">
                  {background.selected && (
                    <div className="bg-accent pr-4 pl-2 py-1 rounded-md text-white self-end flex gap-2 items-center justify-center m-4 absolute top-0 right-0 z-10">
                      <i className="bx bx-check text-md"></i>
                      <p>Selected</p>
                    </div>
                  )}

                  {!background.selected && (
                    <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/50 flex items-center justify-center text-white text-md">
                      {background.owned
                        ? "Click to select"
                        : "This background is locked"}
                    </div>
                  )}
                  <div
                    className="flex flex-col items-start justify-end h-full px-6 pb-5"
                    style={{
                      background: FADE_BG,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <h2 className="text-white text-lg">{background.name}</h2>
                      <p
                        style={{
                          background: tierColor,
                        }}
                        className="text-white px-6 py-[2px] rounded-full"
                      >
                        {tier}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            <img
              src={background.URL}
              alt=""
              className={cn(
                "object-cover h-full w-full transition-all duration-200",

                !background.selected && "group-hover:scale-[102.5%]"
              )}
            />
          </li>
        );
      })}
    </ul>
  );
}
