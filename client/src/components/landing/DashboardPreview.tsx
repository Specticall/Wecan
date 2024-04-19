import dashboardUI from "/assets/dashboardUI.png";
import floatingCard from "/assets/hero-floating-card.png";
import line from "/assets/hero-line.png";

export default function DashboardPreview() {
  return (
    <div className="mt-12 relative">
      <div className="max-w-[1200px] mx-auto relative z-[1]">
        <img src={dashboardUI} className=""></img>
        <div className="absolute bg-[#B9B2FF] left-0 right-0.5 top-[10rem] bottom-[-3.5rem] rounded-3xl z-[-1] scale-[90%]"></div>
        <div className="absolute bg-[#948BFF] left-0 right-0.5 top-[10rem] bottom-[-7rem] rounded-3xl z-[-2] scale-[80%]"></div>
        <img
          src={floatingCard}
          className="absolute top-[-2.5rem] left-[-3rem]"
        />
        <img
          src={line}
          alt="floating line"
          className="absolute top-[-95%] right-[-10rem] z-[-3]"
        />
      </div>
      <div className="bg-white h-[10rem] w-full absolute z-[-10] bottom-0"></div>
    </div>
  );
}
