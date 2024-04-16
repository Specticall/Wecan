import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Skeleton from "react-loading-skeleton";

const routes = [
  {
    text: "Dashboard",
    icon: <i className="bx bx-home"></i>,
    route: ["/app/dashboard"],
  },
  {
    text: "My Diary",
    icon: <i className="bx bx-book-open"></i>,
    route: ["/app/diary"],
  },
  {
    text: "Task",
    icon: <i className="bx bx-task"></i>,
    route: ["/app/task/generator", "/app/task", "/app/task/all"],
  },
  {
    text: "Statistics",
    icon: <i className="bx bx-line-chart"></i>,
    route: ["/app/statistics"],
  },
];

export default function DesktopNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userData } = useUser();

  return (
    <nav className="flex gap-6 px-4 py-4">
      <h2 className="bg-white px-8 py-3 rounded-xl text-lg flex items-center justify-center">
        Wecan
      </h2>
      <ul className="rounded-xl flex-1 bg-white items-center justify-between  px-3 py-3 flex">
        <div className="flex bg-white-soft justify-start w-fit rounded-lg px-2 py-2 gap-4">
          {routes.map((route) => {
            const isOnPath = route.route.some((route) =>
              pathname.includes(route)
            );
            return (
              <li
                key={`${route.route}`}
                className={clsx(
                  "flex px-4 py-2 items-center justify-center gap-2 cursor-pointer transition-all duration-200",
                  isOnPath && "bg-white shadow-lg shadow-accent/10 rounded-md"
                )}
                onClick={() => navigate(route.route[0])}
              >
                <div className="[&>i]:text-md [&>*]:flex [&>*]:items-center [&>*]:justify-center">
                  {route.icon}
                </div>
                <p>{route.text}</p>
              </li>
            );
          })}
        </div>
        <div className="flex items-center gap-4">
          <p>{userData?.name || <Skeleton />}</p>
          <div className="h-10 aspect-square rounded-full bg-red-200 overflow-hidden mr-3">
            {userData && userData.pictureURL ? (
              <img
                src={userData?.pictureURL}
                alt=""
                referrerPolicy="no-referrer"
              />
            ) : (
              <Skeleton
                width={"100%"}
                height={"100%"}
                className="translate-y-[-3px]"
              />
            )}
          </div>
        </div>
      </ul>
    </nav>
  );
}
