import { useLocation } from "react-router-dom";
import Button from "../general/Button";

type NavigatorProps = {
  nextCallback: () => void;
  previousCallback: () => void;
  nextText: string;
  prevText: string;
};

export default function OnboardingNavigator({
  nextCallback = () => {},
  previousCallback = () => {},
  nextText = "Next",
  prevText = "Previous",
}: NavigatorProps) {
  return (
    <div className="w-full grid grid-cols-[10rem_1fr_10rem] max-w-[1500px] mx-auto px-8 pb-4 mt-16">
      <Button variant="tertiary" onClick={previousCallback}>
        {prevText}
      </Button>

      <div></div>
      <Button className="shadow-none" onClick={nextCallback}>
        {nextText}
      </Button>
    </div>
  );
}
