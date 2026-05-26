import Api from "../../../configs/axios";

export interface BrandItem {
  brand: string;
  minPrice: string;
  maxPrice: string;
}

export interface Pagination {
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GetBrandsResponse {
  data: BrandItem[];
  pagination: Pagination;
}

export interface GetBrandsParams {
  page?: number;
  size?: number;
}

export const getBrands = async (
  params: GetBrandsParams
): Promise<GetBrandsResponse> => {
  const response = await Api.get("/products/brands", {
    params,
  });

  return response.data;
};