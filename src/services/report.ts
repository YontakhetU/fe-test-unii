import { ListCategoryType, ListReportWithSummaryType } from "@/types/report";
import httpClient from "@/utils/httpClient";
import { DateRange } from "react-day-picker";

type ReportQueryParams = {
  date?: DateRange;
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  subCategoryId?: string;
  orderId?: string;
  minPrice?: number;
  maxPrice?: number;
  grade?: string;
  keyword?: string;
};

const formatDateToYMD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getReportAll = async (params: ReportQueryParams) => {
  const queryParams = new URLSearchParams();

  const startDate =
    params.startDate ??
    (params.date?.from ? formatDateToYMD(params.date.from) : undefined);
  const endDate =
    params.endDate ??
    (params.date?.to ? formatDateToYMD(params.date.to) : undefined);

  if (startDate) queryParams.append("startDate", startDate);
  if (endDate) queryParams.append("endDate", endDate);
  if (params.categoryId && params.categoryId !== "all")
    queryParams.append("categoryId", params.categoryId);
  if (params.subCategoryId && params.subCategoryId !== "all")
    queryParams.append("subCategoryId", params.subCategoryId);
  if (params.orderId) queryParams.append("orderId", params.orderId);
  if (params.minPrice !== undefined && params.minPrice !== null)
    queryParams.append("minPrice", params.minPrice.toString());
  if (params.maxPrice !== undefined && params.maxPrice !== null)
    queryParams.append("maxPrice", params.maxPrice.toString());
  if (params.grade && params.grade !== "all") {
    queryParams.append("grade", params.grade);
  }
  if (params.keyword?.trim()) {
    queryParams.append("keyword", params.keyword.trim());
  }

  const response = await httpClient.get<ListReportWithSummaryType>(
    `/report/search?${queryParams.toString()}`
  );

  return response.data;
};

export const getCategories = async () => {
  const response = await httpClient.get<ListCategoryType>(`/report/categories`);

  return response.data;
};

export const getSubcategories = async (categoryId: string) => {
  const response = await httpClient.get<ListReportWithSummaryType>(
    `/report/subcategories/${categoryId}`
  );

  return response.data;
};
