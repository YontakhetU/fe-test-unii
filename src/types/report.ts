import { ResponseType } from "./common";

export type ReportDataType = {
  categoryId: string;
  subCategoryId: string;
  categoryName: string;
  subCategoryName: string;
  buyWeight: number;
  buyTotal: number;
  sellWeight: number;
  sellTotal: number;
  buyCount: number;
  sellCount: number;
  remainWeight: number;
  remainAmount: number;
  remainCount: number;
};

export type ListReportDataType = ResponseType<ReportDataType[]>;

export type ReportSummaryType = {
  totalBuyWeight: number;
  totalBuyTotal: number;
  totalSellWeight: number;
  totalSellTotal: number;
  totalRemainWeight: number;
  totalRemainAmount: number;
  totalBuyCount: number;
  totalSellCount: number;
  totalRemainCount: number;
};

export type ListReportWithSummaryType = {
  data: ReportDataType[];
  summary: ReportSummaryType;
};

export type SubCategoryType = {
  subCategoryId: string;
  subCategoryName: string;
  categoryId: string; // เพื่อเชื่อมโยงกับ Category
};

export type CategoryType = {
  categoryId: string;
  categoryName: string;
};

export type ListCategoryType = ResponseType<CategoryType[]>;

export type ListSubCategoryType = ResponseType<SubCategoryType[]>;

