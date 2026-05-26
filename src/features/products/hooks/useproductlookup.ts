import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../configs/axios";

export const useProductLookup = (
  brand: string,
  length: number | null,
  width: number | null
) => {
  return useQuery({
    queryKey: ["product-lookup", brand, length, width],

    queryFn: async () => {
      console.log("API CALL → lookupProduct", { brand, length, width });

      const res = await apiClient.get("/products/lookup", {
        params: { brand, length, width },
      });

      console.log("API RESPONSE in frontend →", res.data);

      return res.data;
    },

    enabled: !!brand && length !== null && width !== null,
  });
};