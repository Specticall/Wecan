import { useAuth } from "@/context/AuthContext";
import { BASE_ENDPOINT, BASE_URL } from "@/lib/config";
import { getWeekStartAndEnd } from "@/lib/utils";
import { THistory, TServerSucessResponse } from "@/types/general";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/*
Stores the days name in an array
*/
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;
// Converts the days name to a shortened version e.g. Sunday -> Sun
const daysShortened = days.map((day) => day.slice(0, 3));

/**
 * This hook is responsible for retrieving neccessary quries, mutations and data to be displayed on the cart.
 * @returns
 */
export default function useBarChartData() {
  const { userId, token } = useAuth();

  const barChartQuery = useQuery({
    queryKey: ["barChartData"],
    queryFn: async () => {
      // Used to retrieve history data that were made from the start of the week (sunday) to the end (saturday). Ensures each week, new data will be displayed on the bar chart.
      const { startDate, endDate } = getWeekStartAndEnd();

      const response = await axios.get<TServerSucessResponse<THistory[]>>(
        `${BASE_URL}${BASE_ENDPOINT}/v1/history?id=${userId}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    },
  });

  const barChartData = barChartQuery.data;

  // Converts the bar chart data to the `<BarChart/>` component object format
  // Assigns each history object to each down day.
  const pointsEarnedEachDay = daysShortened.map((day, dayIndex) => {
    return {
      item: day,
      value:
        barChartData?.find((data) => new Date(data.date).getDay() === dayIndex)
          ?.pointsEarned || 0,
    };
  });

  return { barChartQuery, barChartData, pointsEarnedEachDay };
}
