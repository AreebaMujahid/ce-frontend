import { useQuery } from "@tanstack/react-query";
import { getBrandOptions } from "../services/getbrandoptions";

export const useBrandOptions = (brand: string) => {
  return useQuery({
    queryKey: ["brand-options", brand],
    queryFn: () => getBrandOptions(brand),
    enabled: !!brand, // IMPORTANT
  });
};