import personReadingArt from "/assets/person-reading.png";

export default function EmptyDiaryList() {
  return (
    <>
      <img
        src={personReadingArt}
        alt="Empty diary image"
        className="max-w-[15rem] w-full"
      />
      <h2 className="text-lg text-center mt-12 max-w-[15rem]">
        You haven't written any diaries yet!
      </h2>
      <p className="text-lighter text-center mt-2">Start today!</p>
    </>
  );
}
