import Button from "@/components/general/Button";
import { useViewport } from "@/context/ViewportContext";
import { BG_COLOR } from "@/lib/config";

export function Wave() {
  const { viewport } = useViewport();
  return (
    <section className="mt-12 max-h-[50rem] xl:h-[50rem] md:h-[40rem] relative overflow-hidden">
      <div className="absolute top-[-35rem] right-0 left-0 z-[-1] [&>svg]:w-full w-full xl:top-[-42.5rem]">
        <svg
          preserveAspectRatio={viewport.width < 1300 ? "xMidYMax meet" : "none"}
          height="50rem"
          viewBox="0 0 1440 783"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M710 679.148C1003.51 465.109 1406.5 679.148 1467 773.425V-93H-27V612.027C123.167 724.392 413.5 895.371 710 679.148Z"
            fill={BG_COLOR}
          />
        </svg>
      </div>
      <img
        src="https://source.unsplash.com/2-women-sitting-on-grass-field-during-daytime-yy39ndcPmdU"
        alt="hero image"
        className="w-full object-cover object-top relative z-[-2] h-full"
      />

      <div className="absolute top-[37rem] right-0 left-0 z-[-1] [&>svg]:w-full w-full rotate-180 ">
        <svg
          preserveAspectRatio={viewport.width < 1300 ? "xMidYMax meet" : "none"}
          height="50rem"
          viewBox="0 0 1440 783"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M710 679.148C1003.51 465.109 1406.5 679.148 1467 773.425V-93H-27V612.027C123.167 724.392 413.5 895.371 710 679.148Z"
            fill={BG_COLOR}
          />
        </svg>
      </div>
      {/* ==== CARD ==== */}
      <div className="absolute inset-0 z-10 section md:translate-y-16 translate-y-6">
        <article className="py-12 px-12 rounded-lg absolute right-[2rem] top-[8rem] bg-white md:left-6 md:right-6 md:px-8">
          <i className="bx bx-right-arrow-alt text-xl rotate-[135deg] md:text-lg"></i>
          <h2 className="text-xl max-w-[25rem] mb-4 md:text-lg">
            Prioritizing Mental Well-Being Leads to a Happier Life.
          </h2>
          <p className="text-light mb-4">
            You deserve the world more than you think.
          </p>
          <Button>Learn More</Button>
        </article>
      </div>
    </section>
  );
}
