import Button from "@/components/general/Button";
import DiaryFormMoodSelector from "./DiaryFormMoodSelector";
import DiaryFormHeader from "./DiaryFormHeader";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TMood } from "@/context/MoodContext";

type TDiaryFields = {
  content: "";
  mood: TMood;
};

type TODO = any;
/*
1. Handle UI errors
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

  const onSubmit: SubmitHandler<TDiaryFields> = (value) => {
    console.log("SUBMIT", value);
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
            {...register("content", { required: "Diary can't be empty" })}
            placeholder="Dear Diary, Today I..."
            className="w-full h-40 border-[1px] px-6 py-4 border-border rounded-md resize-none"
          />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <i className="bx bx-wink-smile text-md"></i>
          <p className="text-dark">How are you feeling?</p>
        </div>
        <Controller
          control={control}
          name="mood"
          rules={{ required: "Mood can't be unknown" }}
          render={({ field: { onChange } }) => {
            return <DiaryFormMoodSelector onChange={onChange} />;
          }}
        />
      </div>
      <div className="flex flex-col items-start px-8 pb-6 border-t-[1px] border-border pt-6 ">
        <div className="flex-1"></div>
        <Button
          variant="dark"
          className="py-2 flex items-center justify-center gap-2"
        >
          Save
          <i className="bx bxs-send text-lightest text"></i>
        </Button>
      </div>
    </form>
  );
}
