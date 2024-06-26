export const footerList = [
  {
    title: "Product",
    links: [
      {
        display: "Dashboard",
        link: "",
      },
      {
        display: "Wellness Statistics",
        link: "",
      },
      {
        display: "Activites",
        link: "",
      },
    ],
  },
  {
    title: "Get Help",
    links: [
      {
        display: "About Us",
        link: "",
      },
      {
        display: "Questions",
        link: "",
      },
    ],
  },
  {
    title: "Details",
    links: [
      {
        display: "Executive Summary",
        link: "",
      },
      {
        display: "Business Case",
        link: "",
      },
      {
        display: "Product Design",
        link: "",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="h-[20rem] bg-white w-full xl:h-full xl:grid xl:place-items-center py-6 mt-auto">
      <div className="section pt-20 grid-cols-5 grid xl:gap-16 xl:grid-cols-3 lg:[&&]:grid-cols-2 sm:[&&&]:grid-cols-1 gap-y-12">
        <div className="sm:flex sm:items-center sm:flex-col">
          <p className="text-xl text-dark">
            We<span className="font-normal italic">can.</span>
          </p>
          <p className="text-light max-w-[10rem] mt-6 leading-[200%] sm:text-center">
            © Copyright 2024. All Rights Reserved
          </p>
        </div>
        {footerList.map((footer) => {
          return (
            <ul className="text-light flex flex-col gap-4" key={footer.title}>
              <h3 className="text-dark text-[1rem] sm:text-center">
                {footer.title}
              </h3>
              {footer.links.map((item) => {
                return (
                  <li
                    className="cursor-pointer hover:text-lighter sm:text-center"
                    key={item.display}
                  >
                    <a href={item.link}></a>
                    {item.display}
                  </li>
                );
              })}
            </ul>
          );
        })}
        <ul className="text-light flex flex-col gap-4 sm:items-center">
          <h3 className="text-dark text-[1rem]">Socials</h3>
          <div className="flex gap-4">
            <i className="bx bxl-instagram text-light hover:text-lighter text-lg cursor-pointer"></i>
            <i className="bx bxl-youtube text-light hover:text-lighter text-lg cursor-pointer"></i>
            <i className="bx bxl-facebook-square text-light hover:text-lighter text-lg cursor-pointer"></i>
            <i className="bx bxl-twitter text-light hover:text-lighter text-lg cursor-pointer"></i>
          </div>
        </ul>
      </div>
    </footer>
  );
}
