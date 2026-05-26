import api from "../../../configs/axios";

export interface BrandOptionsResponse {
  lengths: number[];
  widthsByLength: Record<string, number[]>;
}

export const getBrandOptions = async (
  brand: string
): Promise<BrandOptionsResponse> => {
  const response = await api.get(
    `/products/brands/options/${brand}`
  );

  return response.data;
};