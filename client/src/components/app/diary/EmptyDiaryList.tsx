import emptyDiaryArt from "/assets/empty-diary.png";

export default function EmptyDiaryList() {
  return (
    <div className="w-full h-[calc(100vh-12.5rem)] flex flex-col items-center justify-center p-8">
      <img
        src={emptyDiaryArt}
        alt="Empty diary image"
        className="max-w-[20rem] w-full"
      />
      <h2 className="text-lg text-center mt-12 max-w-[15rem]">
        You haven't written any diaries yet!
      </h2>
      <p className="text-lighter text-center mt-2">Start today!</p>
    </div>
  );
}
