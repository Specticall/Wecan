import personReadingArt from "/assets/person-reading.png";

// Shows UI indicating that the diary list is empty.
export default function EmptyDiaryList() {
  return (
    <>
      <img
        src={personReadingArt}
        alt="Empty diary image"
        className="max-w-[15rem] w-full md:max-w-[12.5rem] 2xl:mt-16"
      />
      <h2 className="text-lg text-center mt-12 max-w-[15rem]">
        You haven't written any diaries yet!
      </h2>
      <p className="text-lighter text-center mt-2 2xl:mb-16">Start today!</p>
    </>
  );
}
