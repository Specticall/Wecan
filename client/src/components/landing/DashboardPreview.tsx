import dashboardUI from "/assets/hero-dashboard.png";

export default function DashboardPreview() {
  return (
    <div className="mt-12 relative md:hidden">
      <div className="max-w-[1200px] mx-auto relative z-[1] px-12">
        <img src={dashboardUI} className="scale-[105%]"></img>
      </div>
      <div className="bg-white h-[10rem] w-full absolute z-[-10] bottom-0"></div>
    </div>
  );
}
