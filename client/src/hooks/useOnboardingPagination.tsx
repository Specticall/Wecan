import { useLocation, useNavigate } from "react-router-dom";

// Since the url is made in this format `/onboarding/step-1`, we can extract the page number by splitting the url.
const parseURL = (url: string) => Number(url.split("step-")[1]);
const PAGE_LENGTH = 3;

// Handles the pagination for the onboarding process
export default function useOnboardingPagination() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Retrieves the current page number from the URL
  const page = parseURL(pathname);

  const nextPage = () => {
    const next = Math.min(page + 1, PAGE_LENGTH);
    navigate(`/onboarding/step-${next}`);
  };

  const prevPage = () => {
    const prev = Math.max(page - 1, 0);
    navigate(`/onboarding/step-${prev}`);
  };

  return { nextPage, prevPage };
}
