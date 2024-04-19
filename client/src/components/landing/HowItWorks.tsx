import { useState } from "react";
import taskUI from "/assets/taskUI.png";
import statisticsUI from "/assets/statisticsUI.png";
import dashboardUI from "/assets/dashboardUI.png";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Set Your Goals",
    icon: <i className="bx bx-line-chart"></i>,
    description:
      "Set how much points you are willing to dedicate yourself to earn. We don’t place time limits because we believe everyone goes at their own pace.",
    image: dashboardUI,
  },
  {
    title: "Earn Points",
    icon: <i className="bx bx-coin-stack"></i>,
    description:
      "Earn points by accepting our curated list of tasks that suits your mood at any time.",
    image: taskUI,
  },
  {
    title: "Track Progress",
    icon: <i className="bx bx-coin-stack"></i>,
    description:
      "We provide a way for you to check the statistics on results you have earned along your goal journey.",
    image: statisticsUI,
  },
] as const;

export default function HowItWorks() {
  const [selected, setSelected] = useState(1);

  return (
    <section className="py-32 section overflow-x-hidden" id="how-it-works">
      <div className="flex flex-col items-center justify-center mb-20 ">
        <div className="bg-[#CED3FF] text-accent px-8 py-2 rounded-full">
          How Our App Works
        </div>
        <h2 className="text-xl text-dark mt-8 font-semibold max-w-[35rem] text-center">
          A productive and easy way to spend your free time on.
        </h2>
        <p className="mt-8 text-light max-w-[35rem] text-center leading-lg">
          Our application is based around the concept of “Wellness points” where
          you earn them through completing tasks that we provide to you.
        </p>
      </div>
      <div className="grid grid-cols-[8fr_10fr] gap-32 mt-32 lg:grid-cols-1 md:mt-8">
        <div className="row-span-3 flex flex-col gap-6">
          {items.map((item, i) => {
            return (
              <PointItem
                key={item.title}
                item={item}
                selected={i === selected}
                onClick={() => setSelected(i)}
              />
            );
          })}
        </div>
        <div className="relative row-span-3 lg:hidden">
          <img
            src={items[selected].image}
            className="absolute bottom-[-4rem] top-[6rem] right-[-12rem] scale-[185%]"
          />
        </div>
      </div>
    </section>
  );
}

function PointItem({
  item,
  selected,
  onClick = () => {},
}: {
  item: (typeof items)[number];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <article
      className={cn(
        "grid grid-cols-[auto_1fr]  rounded-xl px-8 py-8 place-items-center gap-x-4 gap-y-5 cursor-pointer md:p-6",
        !selected && "hover:bg-white/80 transition-all duration-200",
        selected && "bg-white"
      )}
      onClick={onClick}
    >
      <div className="bg-accent text-md text-white w-10 aspect-square flex items-center justify-center rounded-md">
        {item.icon}
      </div>
      <h3 className="justify-self-start text-md">{item.title}</h3>
      <p className="col-span-2 text-light leading-md">{item.description}</p>
    </article>
  );
}
