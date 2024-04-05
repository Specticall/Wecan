import AcceptedTask from "@/components/app/task/AcceptedTask";
import TaskGenerator from "@/components/app/task/TaskGenerator";

export default function Task() {
  return (
    <main className="grid grid-cols-[1fr_1fr] grid-rows-[6.5rem_1fr] items-start dotted-grid">
      <div className="col-span-2 self-start justify-self-start">
        <h1 className="text-lg font-semibold pt-12 pb-6 mb-4">Tasks</h1>
      </div>
      <TaskGenerator />
      <AcceptedTask />
    </main>
  );
}
