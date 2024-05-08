import useBackground from "@/hooks/useBackground";
import { TCollectionFilter } from "./CollectionHeader";
import { useUser } from "@/context/UserContext";
import BackgroundCard from "./BackgroundCard";
import Skeleton from "react-loading-skeleton";

function createFilterFn<T extends { owned: boolean }>() {
  return {
    All: (item: T) => item,
    Locked: (item: T) => !item.owned,
    Unlocked: (item: T) => item.owned,
  };
}

// Container element for image lists
export default function CollectionImages({
  filter,
}: {
  filter: TCollectionFilter;
}) {
  const { backgroundData, selectMutation } = useBackground();

  // Getting User Query from the cache (instead of creating one)
  const { userQuery } = useUser();

  // if (!backgroundData || true) return;

  // get filter function (used in `.filter()`)  based on the passed in `filter` prop. Later on this function will be used to filter things the user wants to be displayed on the screen. We're doing a function call here to satisfy some typescript generic stuff.
  const selectedFilterFn = createFilterFn()[filter];

  return (
    <ul className="grid grid-cols-3 gap-8 bg-white-soft p-6 rounded-lg mt-8 2xl:grid-cols-2 2xl:gap-6 lg:grid-cols-1 md:p-4 sm:p-0 sm:bg-transparent flex-1">
      {/* Skeleton element when no background exists. */}
      {!backgroundData &&
        new Array(6).fill(0).map((_, i) => {
          return <Skeleton height={"20rem"} key={i} />;
        })}
      {/* Filter used Here VVVVVVVVV */}
      {backgroundData?.filter(selectedFilterFn).map((background) => {
        // Checks is the current image should show Loading state
        const isChangingImage =
          selectMutation.context?.backgroundId === background.id &&
          (selectMutation.isLoading || userQuery.isRefetching);

        // Sets the user background
        const handleSelect = () => {
          if (background.selected || !background.owned) return;
          selectMutation.mutate(background.id);
        };

        return (
          <BackgroundCard
            key={background.id}
            background={background}
            isLoading={isChangingImage}
            onClick={handleSelect}
          />
        );
      })}
    </ul>
  );
}
