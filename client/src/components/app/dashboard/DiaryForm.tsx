import Button from "@/components/general/Button";
import DiaryFormMoodSelector from "./DiaryFormMoodSelector";
import DiaryFormHeader from "./DiaryFormHeader";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TMood, TMoodServerEnum } from "@/context/MoodContext";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import useDiaryMutation from "@/hooks/useSaveDiary";
import LoadingSpinner from "@/components/general/loadingSpinner";

type TDiaryFields = {
  content: "";
  mood: TMood;
};

type TODO = any;
/*
2. Create post request
3. Loading State
*/

export default function DiaryForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TDiaryFields>();

  const { createMutation } = useDiaryMutation();

  const onSubmit: SubmitHandler<TDiaryFields> = (value) => {
    const newDiary = {
      ...value,
      mood: value.mood.toUpperCase() as TMoodServerEnum,
    };
    createMutation.mutate(newDiary);
  };

  return (
    <form
      className="bg-white shadow-lg rounded-lg shadow-accent/10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DiaryFormHeader />
      <div className="px-8 pt-6 pb-2 rounded-lg">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4 text-dark">
            <i className="bx bx-pencil text-md"></i>
            <p>Anything Happened Today?</p>
          </div>
          <textarea
            {...register("content", { required: "Your diary can't be empty" })}
            placeholder="Dear Diary, Today I..."
            className={twMerge(
              clsx(
                "w-full h-40 border-[1px] px-6 py-4 border-border rounded-md resize-none",
                errors.content && "border-red-500"
              )
            )}
          />
          <div className="text-end mt-2 text-red-500">
            {errors.content?.message}
          </div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <i className="bx bx-wink-smile text-md"></i>
          <p className="text-dark">How are you feeling?</p>
        </div>
        <div
          className={cn(
            errors.mood && "[&>div]:border-red-500 [&>div]:border-[1px]"
          )}
        >
          <Controller
            control={control}
            name="mood"
            rules={{ required: "Mood can't be unknown" }}
            render={({ field: { onChange } }) => {
              return <DiaryFormMoodSelector onChange={onChange} />;
            }}
          />
        </div>
        <div className="text-end text-red-500 mb-4">{errors.mood?.message}</div>
      </div>
      <div className="flex flex-col items-start px-8 pb-6 border-t-[1px] border-border pt-6 ">
        <div className="flex-1"></div>
        <Button
          disabled={createMutation.isLoading}
          variant="dark"
          className="py-2 flex items-center justify-center gap-2"
        >
          Save
          {createMutation.isLoading ? (
            <LoadingSpinner size={"sm"} />
          ) : (
            <i className="bx bxs-send text-white "></i>
          )}
        </Button>
      </div>
    </form>
  );
}
