import LoadingSpinner from "@/components/general/loadingSpinner";
import { cn } from "@/lib/utils";
import { TBackground } from "@/types/general";

const FADE_BG =
  "linear-gradient(0deg, rgba(0,0,0,0.9) 1%, rgba(255,255,255,0) 60%)";

// Match the corresponding tier with their respective color, display text and difficulty data
const getTier = (tier: 1 | 2 | 3) => {
  switch (tier) {
    case 1:
      return {
        tier: "Tier I",
        color: "rgb(42 157 143)",
        difficulty: "Easy",
      };
    case 2:
      return {
        tier: "Tier II",
        color: "rgb(244 162 97)",
        difficulty: "Medium",
      };
    case 3:
      return {
        tier: "Tier III",
        color: "rgb(231 111 81)",
        difficulty: "Hard",
      };
  }
};

// Image card that displays a preview of a certain background image to the user.
export default function BackgroundCard({
  background,
  onClick = () => {},
  isLoading,
  className,
}: {
  background: TBackground & {
    owned?: boolean;
    selected?: boolean;
  };
  onClick?: () => void;
  isLoading?: boolean;
  className?: string;
}) {
  // Retrieve the corresponding data from the background object passed in as prop.
  const { tier, color: tierColor, difficulty } = getTier(background.tier);

  // Owned by the user
  const isOwned = background.owned;

  // Selected by the user
  const isSelected = background.selected;

  return (
    <li
      className={cn(
        "h-[20rem] rounded-lg overflow-hidden relative group cursor-pointer",
        isOwned ? "" : "grayscale",
        className
      )}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="absolute inset-0 bg-black/70 z-30 flex items-center justify-center">
          <LoadingSpinner size={"xl"} className="relative z-20" color="white" />
        </div>
      ) : (
        <>
          <div className="absolute inset-0 z-10">
            {isSelected && (
              <div className="bg-accent pr-4 pl-2 py-1 rounded-md text-white self-end flex gap-2 items-center justify-center m-4 absolute top-0 right-0 z-10">
                <i className="bx bx-check text-md"></i>
                <p>Selected</p>
              </div>
            )}

            {/* Disable hover effect when the user is selecting. */}
            {!isSelected && (
              // Hover effect element
              <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/50 flex items-center justify-center text-white text-md backdrop-blur-sm">
                {/* Displays different UI when the background is owned and not */}
                {isOwned ? (
                  "Click to select"
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-md font-semibold md:text-center">
                      <i className="bx bx-lock-alt text-lg mr-2"></i>
                      You Don't Own This Background
                    </p>
                    <p className="text-slate-100 text-sm md:text-center">
                      Unlock by completing
                      <span className="px-4 py-1 rounded-full bg-accent mx-2 text-sm">
                        {" "}
                        {difficulty}{" "}
                      </span>
                      goals
                    </p>
                  </div>
                )}
              </div>
            )}
            <div
              className="flex flex-col items-start justify-end h-full px-6 pb-5"
              style={{
                background: FADE_BG,
              }}
            >
              <div className="flex items-center gap-4 sm:flex-col-reverse sm:gap-2 sm:items-start">
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

          !isSelected && "group-hover:scale-[102.5%]"
        )}
      />
    </li>
  );
}
