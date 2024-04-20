import StatisticsCardList from "@/components/app/statistics/StatisticsCardList";
import BarChart from "@/components/general/BarChart";
import Button from "@/components/general/Button";
import consultationArt from "/assets/consultation-art.png";
import { ScrollArea } from "@/components/ui/scrollable";
import { formatDate } from "@/lib/utils";
import { ACCENT_GRADIENT } from "@/lib/config";
import GoalResultsCard from "@/components/app/statistics/GoalResultsCard";
import { TGoal } from "@/types/general";
import Checkbox from "@/components/general/Checkbox";
import GoalHistory from "@/components/app/statistics/GoalHistory";
import useGoalMutation from "@/hooks/useGoalMutation";
import ProgressBar from "@/components/general/ProgressBar";
import StatisticsTotalPoints from "@/components/app/statistics/StatisticsTotalPoints";
import StatisticsCard from "@/components/app/statistics/StatisticsCard";

const stats = [400000, 300000, 200000, 100000, 0];
const days = [
  { item: "Mon", value: 150000 },
  { item: "Tue", value: 50000 },
  { item: "Wed", value: 34800 },
  { item: "Thu", value: 40000 },
  { item: "Fri", value: 400000 },
  { item: "Sat", value: 1000 },
  { item: "Sun", value: 100000 },
];

// export default function Statistics() {
//   return (
//     <ScrollArea className="h-screen">
//       <main className="grid grid-rows-[6.5rem_auto_1fr] items-start pr-8 pb-8">
//         <div>
//           <h1 className="text-lg font-semibold pb-10 pt-12">Statistics</h1>
//         </div>
//         <StatisticsCardList />
//         <div className="self-start grid-cols-[4fr_3fr] grid mt-6 gap-8">
//           <article className="bg-white p-8 rounded-md shadow-xl shadow-accent/5">
//             <div className="flex items-center justify-between mb-10">
//               <h4 className="text-md text-dark">Your Weekly Mood</h4>
//               <div className="text-lighter flex items-center justify-center gap-4">
//                 <p>1 - 8 Febuary 2034</p>
//                 <i className="bx bx-calendar text-md"></i>
//               </div>
//             </div>
//             <BarChart yAxis={stats} xAxis={days} />
//           </article>
//           <article className="row-span-2 bg-white px-16 py-8 flex-col flex items-center justify-start">
//             <img
//               src={consultationArt}
//               alt="Consultation art"
//               className="max-w-[30rem] w-full"
//             />
//             <p className="text-start text-light mb-2 self-start">
//               Consultation
//             </p>
//             <h3 className="text-md font-medium mb-8 self-start">
//               Having concerns with your mental health? Book a consultation
//               service with experts on the field.
//             </h3>
//             <Button variant="dark" className="w-full">
//               Book Now
//             </Button>
//           </article>
//           <article className="flex items-center justify-between bg-white px-8 py-8 rounded-md shadow-xl shadow-accent/5">
//             <div className="">
//               <h3 className="text-md">
//                 <i className="text-lg mr-2 bx bx-lock-alt"></i>
//                 You haven't scored enough
//               </h3>
//               <p className="text-lighter">
//                 Earn the minimal points requirement to view your results
//               </p>
//             </div>
//             <Button className="px-12 bg-gray-400 shadow-none">
//               View Results
//             </Button>
//           </article>
//         </div>
//       </main>{" "}
//     </ScrollArea>
//   );
// }

export default function Statistics() {
  const { goalData } = useGoalMutation();

  return (
    <main className="px-4 pb-4 grid grid-cols-[11fr_5fr] gap-4">
      <div className="flex flex-col">
        <StatisticsTotalPoints />
        <StatisticsCardList />
        <div className="mt-4 bg-white p-8 rounded-xl flex-1">
          <BarChart yAxis={stats} xAxis={days} className="h-full" />
        </div>
      </div>
      <div>
        <GoalResultsCard />
        <GoalHistory />
      </div>
    </main>
  );
}
