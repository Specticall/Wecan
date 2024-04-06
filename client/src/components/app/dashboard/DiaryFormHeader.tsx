export default function DiaryFormHeader() {
  return (
    <header className="bg-accent px-8 py-8 rounded-lg">
      <div className="flex gap-2 items-center mb-1">
        <i className="bx bx-message-rounded-dots text-lightest text-md"></i>
        <p className="text-lightest">Daily Journay</p>
      </div>
      <h2 className="text-lightest text-md mb-4">How's your day today?</h2>
      <div className="flex items-center justify-start gap-3">
        <div className="px-4 py-1 rounded-full bg-darkest text-white">
          43 Days
        </div>
        <div className="text-white flex items-center gap-1">
          <i className="bx bxs-flame text-md"></i>
          <p>Streak</p>
        </div>
      </div>
    </header>
  );
}
