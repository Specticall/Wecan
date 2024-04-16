import { useLocation, useNavigate } from "react-router-dom";
import Button from "../general/Button";

/**
 * Returns the number indicating current step of the multistep form.
 * @example "/onboarding/step-1" will turn into 1
 * @param URL
 * @returns
 */
const parseStepURL = (URL: string) => {
  return Number(URL.split("step-")[1]);
};

export default function OnboardingNavigator() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const currentStep = parseStepURL(pathname);

  const handleNextStep = () => {
    navigate(`/onboarding/step-${currentStep + 1}`);
  };
  const handlePrevStep = () => {
    navigate(`/onboarding/step-${currentStep - 1}`);
  };

  const handleComplete = () => {
    navigate(`/app/dashboard`);
  };

  return (
    <div className="section w-full grid grid-cols-[10rem_1fr_10rem] pb-12">
      {pathname === "/onboarding/step-1" ? (
        <div></div>
      ) : (
        <Button variant="tertiary" onClick={handlePrevStep}>
          Previous
        </Button>
      )}
      <div></div>
      {pathname === "/onboarding/step-3" ? (
        <>
          <Button className="shadow-none" onClick={handleComplete}>
            Complete
          </Button>
        </>
      ) : (
        <>
          <Button className="shadow-none" onClick={handleNextStep}>
            Next
          </Button>
        </>
      )}
    </div>
  );
}
