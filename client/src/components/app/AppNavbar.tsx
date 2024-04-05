import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import Icons from "../general/Icon";
import DateDisplay from "../general/DateDisplay";
import Button from "../general/Button";

const routes = [
  {
    text: "Dashboard",
    icon: <i className="bx bx-home"></i>,
    route: "/app/dashboard",
  },
  {
    text: "My Diary",
    icon: <i className="bx bx-book-open"></i>,
    route: "/app/diary",
  },
  {
    text: "Task",
    icon: <i className="bx bx-task"></i>,
    route: "/app/task",
  },
  {
    text: "Statistics",
    icon: <i className="bx bx-line-chart"></i>,
    route: "/app/statistics",
  },
];

export default function AppNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="">
      <ul className="pt-12 pb-6 max-w-[18rem] h-full bg-white flex flex-col justify-start pr-6">
        <div className="pl-8">
          <Icons icon="logo" />
          <DateDisplay className="justify-start mt-5 mb-12" />
          <p className="text-lighter mb-2">All Menu</p>
        </div>
        {routes.map((route) => {
          const isOnPath = route.route === pathname;
          return (
            <li
              className={clsx(
                "rounded-r-full pr-5 pl-8 py-3 flex gap-4 cursor-pointer transition-all duration-100 items-center justify-start hover:bg-black hover:text-white",
                isOnPath && "bg-accent text-white"
              )}
              onClick={() => navigate(route.route)}
            >
              <div className="[&>i]:text-md">{route.icon}</div>
              <p>{route.text}</p>
            </li>
          );
        })}
        <div className="flex-1 "></div>
        <Button variant="dark" className="ml-6">
          Logout
        </Button>
      </ul>
    </nav>
  );
}
