// Displays UI indicating that a diary has not been selected.
export default function DiaryDetailsEmpty() {
  return (
    <div className="flex flex-col justify-center items-center flex-1 p-8">
      <i className="bx bx-edit text-lg mb-2 text-lighter"></i>
      <p className="text-lighter max-w-[15rem] text-center leading-6">
        See a diary's details by clicking the cards on the left
      </p>
    </div>
  );
}
