import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../services/getbrands";
export const useBrands = (page: number, size: number = 12) => {
  return useQuery({
    queryKey: ["brands", page, size],
    queryFn: () =>
      getBrands({
        page,
        size,
      }),
    keepPreviousData: true,
  });
};