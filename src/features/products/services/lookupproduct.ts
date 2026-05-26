import api from "../../../configs/axios";

export interface LookupProductParams {
  brand: string;
  length: number;
  width: number;
}

export const lookupProduct = async (
  params: LookupProductParams
) => {
  const response = await api.get("/products/lookup", {
    params,
  });

  return response.data;
};