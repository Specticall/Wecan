import Button from "@/components/general/Button";
import { TMood } from "@/context/MoodContext";
import useTaskMutation from "@/hooks/useTaskMutation";
import { getMoodColor } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function OnGoingTask() {
  const { userTask } = useTaskMutation();
  const navigate = useNavigate();

  const onGoingTask = userTask
    ? userTask.filter((task) => task.status === "OnGoing")
    : undefined;

  return (
    <article className="bg-white-soft mt-4 p-10 rounded-xl">
      <header className="mb-8 flex justify-between items-center gap-6">
        <div>
          <h2 className="text-lg text-darkest flex items-center justify-start gap-2">
            <i className="bx bx-clipboard text-[2rem] text-dark"></i>
            Your On Going Tasks
          </h2>
          <p className="text-lighter mt-2">
            Looks like you've got things to do, what are you waiting for?
          </p>
        </div>
        <Button
          variant="clean"
          className="bg-white px-6 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-border"
          onClick={() => navigate("/app/task/all")}
        >
          View All
          <i className="bx bx-chevron-right text-md"></i>
        </Button>
      </header>
      <div className="grid grid-cols-2 gap-8">
        {onGoingTask?.slice(0, 2).map((task) => {
          return (
            <article className="grid grid-cols-[auto_1fr] bg-white rounded-xl p-8 grid-rows-[12rem_4rem] gap-x-4">
              <div
                className="row-span-3 w-2 h-2 rounded-full mt-3"
                style={{ background: getMoodColor(task.mood as TMood) }}
              ></div>
              <div className="overflow-hidden">
                <h3 className="text-md">{task.title}.</h3>
                <p className="text-lighter mt-6 leading-[175%] line-clamp-3 ">
                  {task.description}
                </p>
              </div>
              <div className="text-lighter">
                <p className="mb-2">On Completion</p>
                <div className="bg-accent px-4 py-1 text-white w-fit rounded-full">
                  +{task.points} Points
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </article>
  );
}
