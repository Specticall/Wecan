import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/general/Dropdown";
import { useLocation, useNavigate } from "react-router-dom";

/*
Navigates between different the different viewing mode that exists within the task preview (board / list (table))
*/
export default function TaskNavigation({ className }: { className?: string }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Dropdown
      className={className}
      canUnselect={false}
      onSelect={(selection) => {
        if (!selection) return;
        // selection is either "board" or "list" so when we navigate we want to go to the respective route (previous_route/board or previous_route/list)
        navigate(`${selection?.toLowerCase()}`);
      }}
      defaultValue={pathname.includes("list") ? "List" : "Board"}
    >
      <DropdownTrigger
        className="bg-white-soft rounded-full text-dark flex gap-2 items-center justify-center px-6 py-2 hover:bg-slate-200 transition-all duration-200"
        render={(selection) => {
          return (
            <>
              <p className="">{selection}</p>
              <i className="text-lg bx bx-chevron-down"></i>
            </>
          );
        }}
      ></DropdownTrigger>
      <DropdownContent className="[&>*]:pr-8">
        <DropdownItem itemValue="Board">Board</DropdownItem>
        <DropdownItem itemValue="List">List</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
