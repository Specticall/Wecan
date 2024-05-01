import { useLocation, useNavigate } from "react-router-dom";

const parseURL = (url: string) => Number(url.split("step-")[1]);
const PAGE_LENGTH = 3;

export default function useOnboardingPagination() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
