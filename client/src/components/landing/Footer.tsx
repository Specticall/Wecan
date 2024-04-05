import Icons from "@/components/general/Icon";

export const footerList = [
  {
    title: "PRODUCT",
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
    title: "GET HELP",
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
    title: "DETAILS",
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
    <footer className="h-[20rem] bg-black w-full xl:h-full xl:grid xl:place-items-center py-6 mt-auto">
      <div className="section pt-20 grid-cols-5 grid xl:gap-16 xl:grid-cols-3 lg:[&&]:grid-cols-2 sm:[&&&]:grid-cols-1 gap-y-12">
        <div className="sm:flex sm:items-center sm:flex-col">
          <Icons icon="logo" color="white" />
          <p className="text-lighters max-w-[10rem] mt-6 leading-[200%] sm:text-center">
            © Copyright 2024. All Rights Reserved
          </p>
        </div>
        {footerList.map((footer) => {
          return (
            <ul className="text-light flex flex-col gap-4">
              <h3 className="text-white text-[1rem] sm:text-center">
                {footer.title}
              </h3>
              {footer.links.map((item) => {
                return (
                  <li className="cursor-pointer hover:text-lighter sm:text-center">
                    <a href={item.link}></a>
                    {item.display}
                  </li>
                );
              })}
            </ul>
          );
        })}
        <ul className="text-light flex flex-col gap-4 sm:items-center">
          <h3 className="text-white text-[1rem]">SOCIALS</h3>
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
