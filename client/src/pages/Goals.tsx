/*
DEPRECATED: This component is no longer in use. This component was made for the old landing page UI.
*/

import buildingConfidenceIllustartion from "/assets/goals-building-confidence.png";
import eraseAnxietyIllustartion from "/assets/goals-erase-anxiety.png";
import selfLoveIllustartion from "/assets/goals-self-love.png";

export const goalList = [
  {
    title: "Building Confidence",
    description:
      "Building confidence is essential for personal growth and success in all aspects of life",
    image: buildingConfidenceIllustartion,
  },
  {
    title: "Erase Anxiety",
    description:
      "Navigating life with a focus on erasing anxiety allows for greater clarity of mind and the pursuit of meaningful endeavors.",
    image: eraseAnxietyIllustartion,
  },
  {
    title: "Self Love",
    description:
      "Self-love empowers clear-minded navigation through life, fostering confidence in pursuing meaningful endeavors.",
    image: selfLoveIllustartion,
  },
];

export function Goals() {
  return (
    <section className="section mt-32">
      <h2 className="text-xl text-center">
        Let's Set Your <span className="text-accent">Goals!</span>
      </h2>
      <ul className="grid grid-cols-3 lg:[&&]:grid-cols-1 lg:[&&]:max-w-[30rem] lg:[&&]:mx-auto lg:[&&]:gap-20 xl:grid-cols-2 gap-8 mt-16">
        {goalList.map((goal) => {
          return (
            <li
              className="relative max-h-[40rem] bg-white px-8 rounded-md overflow-hidden pb-8 pt-10 grid grid-rows-[20rem_1fr] xl:grid-rows-[25rem_1fr] md:flex md:flex-col gap-y-6 md:px-6"
              key={`${goal.title}${goal.description}`}
            >
              <div className="w-full bg-accent absolute top-0 right-0 left-0 h-2"></div>
              <div className="p-3 pb-12 border-b-[1px] border-border">
                <img
                  src={goal.image}
                  alt={`${goal.title} image`}
                  className="h-full object-cover w-full md:h-fit"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-lg text-darkest mb-4">{goal.title}</h3>
                <p className="text-lighter leading-[175%]">
                  {goal.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="bg-red-500 flex"></div>
    </section>
  );
}
