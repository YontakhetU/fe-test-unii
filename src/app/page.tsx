"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  getCategories,
  getReportAll,
  getSubcategories,
} from "@/services/report";
import { CiSearch } from "react-icons/ci";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  CategoryType,
  SubCategoryType,
  ListReportWithSummaryType,
} from "@/types/report";
import { formatNumber } from "@/utils/format";

export default function Home() {
  const [data, setData] = useState<ListReportWithSummaryType>();
  const [categoryId, setCategoryId] = useState<string>("");
  const [subCategoryId, setSubCategoryId] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [categories, setCategories] = useState<CategoryType[] | undefined>(
    undefined
  );
  const [subcategories, setSubcategories] = useState<
    SubCategoryType[] | undefined
  >(undefined);

  const fetchData = async () => {
    try {
      const params = {
        categoryId,
        date,
        subCategoryId,
        minPrice,
        maxPrice,
        grade,
        keyword,
      };

      const result = await getReportAll(params);
      setData(result);
      console.log(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Failed to fetch report data");
      } // setError(err.message || "Failed to fetch report data");
    }
  };

  const fetchCategoriesData = async () => {
    try {
      const result = await getCategories();
      setCategories(result.data);
      console.log(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Failed to fetch report data");
      } // setError(err.message || "Failed to fetch report data");
    }
  };

  const fetchSubCategoriesData = async (value: string) => {
    try {
      const result = await getSubcategories(value);
      setSubcategories(result.data);
      console.log(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Failed to fetch report data");
      } // setError(err.message || "Failed to fetch report data");
    }
  };
  useEffect(() => {
    fetchData();
    fetchCategoriesData();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen bg-[#f8f8f8] pt-10 px-5 gap-20">
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-xl text-[#6f6f6f]">สต๊อกสินค้า</p>
        </div>
        <div className="flex gap-3">
          <div className="grid grid-cols-3 w-[60%] gap-y-6 gap-x-3">
            <div className=" ">
              {" "}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-between text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "Y-MM-dd")} -{" "}
                          {format(date.to, "Y-MM-dd")}
                        </>
                      ) : (
                        format(date.from, "Y-MM-dd")
                      )
                    ) : (
                      <span>เลือกวัน</span>
                    )}
                    <CalendarIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className=" relative">
              {" "}
              <span className="absolute text-xs -top-4">
                เลือกหมวดหมู่สินค้า
              </span>
              <Select
                onValueChange={async (value) => {
                  setCategoryId(value);
                  fetchSubCategoriesData(value);
                }}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="เลือกหมวดหมู่สินค้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>หมวดหมู่สินค้า</SelectLabel>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    {categories?.map((item) => (
                      <SelectItem key={item.categoryId} value={item.categoryId}>
                        {item.categoryName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className=" relative">
              {" "}
              <span className="absolute text-xs -top-4">
                เลือกหมวดหมู่สินค้าย่อย
              </span>
              <Select
                disabled={!categoryId}
                onValueChange={async (value) => {
                  setSubCategoryId(value);
                }}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="เลือกหมวดหมู่สินค้า" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>หมวดหมู่สินค้า</SelectLabel>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    {subcategories?.map((item) => (
                      <SelectItem
                        key={item.subCategoryId}
                        value={item.subCategoryId}
                      >
                        {item.subCategoryName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>{" "}
            <div className=" relative">
              {" "}
              <span className="absolute text-xs -top-4">เลือกราคา</span>
              <Input
                type="number"
                className="bg-[white] "
                value={minPrice}
                placeholder="ราคาเริ่มต้น"
                onChange={(e) => setMinPrice(e.target.value)}
              />{" "}
              <div className=" absolute text-xs bottom-4  w-[12px] h-0.5 bg-gray-300 -right-3 z-0"></div>
            </div>
            <div className="relative ">
              {" "}
              <Input
                type="number"
                disabled={!minPrice}
                className="bg-[white] "
                value={maxPrice}
                placeholder="ราคาสุดท้าย"
                onChange={(e) => setMaxPrice(e.target.value)}
              />{" "}
            </div>
            <div className="relative">
              {" "}
              <span className="absolute text-xs -top-4">เลือกเกรด</span>
              <Select value={grade} onValueChange={(value) => setGrade(value)}>
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="เลือกหมวดหมู่สินค้าย่อย" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Grade</SelectLabel>
                    <SelectItem value="all">ALL</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex w-[40%] gap-3">
            {" "}
            <div className="w-full relative h-fit">
              {" "}
              <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="ค้นหาหมายเลขคำสั่งซื้อ,ค้นหาชื่อสินค้าย่อย"
                className="bg-[white] pl-9"
              />{" "}
              <div className=" absolute text-xs bottom-4 w-10  h-full left-2 top-0 z-0 flex items-center">
                {" "}
                <CiSearch color="#010101" size={16} className="" />
                <div className="ml-1 h-5 w-[1px] bg-gray-100"></div>
              </div>
            </div>
            <div>
              <button
                className="bg-[#ba289b] px-5 py-2.5 rounded-sm cursor-pointer"
                onClick={() => fetchData()}
              >
                {" "}
                <CiSearch color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>
            <p className="text-xl text-[#6f6f6f]">คลังสินค้า</p>
            <div className="my-2">
              <p className="text-sm text-[#6f6f6f]">
                จำนวนซื้อ จำนวนขายคิดหน่วยเป็น{" "}
                <span className="text-[#d9c3ec]"> กก (กิโลกรัม) </span>
              </p>
              <p className="text-sm text-[#6f6f6f]">
                ยอดซื้อ, ยอดขายคิดหน่วยเป็น{" "}
                <span className="text-[#d9c3ec]"> บาท </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white  rounded-xl   shadow-lg">
          {data?.data?.map((item, index) => (
            <div key={index} className="pt-4 px-2  ">
              <div className="flex w-full border bg-[#d9c3ec] justify-between">
                <div className="w-[8%] flex flex-col justify-between border">
                  <div className="text-center py-5">
                    {" "}
                    <p>สินค้า</p> <p>{item?.categoryName || ""} </p>
                  </div>
                  <div className="bg-white text-center px-2">
                    {item?.subCategoryName || ""}
                  </div>
                  <div className="bg-white text-center"> </div>
                </div>
                <div className=" w-[31.66%] flex flex-col  ">
                  <div className="text-center py-2 border">ซื้อ</div>
                  <div className="w-full h-full flex flex-col justify-end items-end ">
                    <div className="bg-white w-fit h-full flex flex-col justify-center">
                      <div className="bg-[#e7dcee] px-4">
                        <p className=" text-center">จำนวน/บาท</p>
                      </div>
                      <div className="h-full flex items-center justify-center">
                        <p className=" text-center ">
                          {" "}
                          {formatNumber(item?.buyTotal) || "0"}
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#f9f9f9]  w-1/2 text-center">
                      {item?.buyCount || "0"}
                      Transaction
                    </div>
                  </div>
                </div>
                <div className=" w-[31.66%] flex flex-col  ">
                  <div className="text-center py-2 border">ขาย</div>
                  <div className="w-full h-full flex flex-col justify-end items-end">
                    <div className="bg-white w-fit h-full flex flex-col justify-center">
                      <div className="bg-[#e7dcee] px-4 ">
                        <p className=" text-center ">จำนวน/บาท</p>
                      </div>
                      <div className="h-full flex items-center justify-center">
                        <p className=" text-center ">
                          {formatNumber(item?.sellTotal) || "0"}
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#f9f9f9]  w-1/2 text-center ">
                      {item?.sellCount || "0"} Transaction
                    </div>
                  </div>
                </div>
                <div className=" w-[31.66%] flex flex-col  ">
                  <div className="text-center py-2 border">คงเหลือ</div>
                  <div className="w-full h-full flex flex-col justify-end items-end">
                    <div className="bg-white w-fit h-full flex flex-col justify-center">
                      <div className="bg-[#e7dcee] px-4">
                        <p className=" text-center">จำนวน/บาท</p>
                      </div>
                      <div className="h-full flex items-center justify-center">
                        <p className=" text-center ">
                          {formatNumber(item?.remainAmount)}
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#f9f9f9]  w-full text-center ">
                      {item?.remainCount || "0"} Transaction
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="pt-4 pb-6 px-2 ">
            <div className="flex w-full border bg-[#d9c3ec] justify-between">
              <div className="w-[8%] flex flex-col justify-between border">
                <div className="text-center py-2 flex items-center justify-center">
                  #
                </div>
                <div className="bg-white "></div>
                <div className="bg-white text-center ">รวม</div>
              </div>
              <div className=" w-[31.66%] flex flex-col ">
                <div className="text-center py-2 border">ซื้อ</div>
                <div className="w-full h-full flex flex-col justify-end items-end">
                  <div className="bg-white w-fit  ">
                    <div className="bg-[#e7dcee] px-4">
                      <p className=" text-center">จำนวน/บาท</p>
                    </div>
                    <div>
                      <p className=" text-center ">
                        {formatNumber(data?.summary.totalBuyTotal || 0) || "0"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#f9f9f9] w-1/2 text-center ">
                    {" "}
                    {data?.summary.totalBuyCount || "0"}
                    Transaction
                  </div>
                </div>
              </div>
              <div className=" w-[31.66%] flex flex-col  ">
                <div className="text-center py-2 border">ขาย</div>
                <div className="w-full h-full flex flex-col justify-end items-end">
                  <div className="bg-white w-fit  ">
                    <div className="bg-[#e7dcee] px-4">
                      <p className=" text-center">จำนวน/บาท</p>
                    </div>
                    <div>
                      <p className=" text-center ">
                        {formatNumber(data?.summary.totalSellTotal || 0) || "0"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#f9f9f9]  w-1/2 text-center ">
                    {data?.summary.totalSellCount || "0"} Transaction
                  </div>
                </div>
              </div>
              <div className=" w-[31.66%] flex flex-col  ">
                <div className="text-center py-2 border">คงเหลือ</div>
                <div className="w-full h-full flex flex-col justify-end items-end">
                  <div className="bg-white w-fit  ">
                    <div className="bg-[#e7dcee] px-4">
                      <p className=" text-center">จำนวน/บาท</p>
                    </div>
                    <div>
                      <p className=" text-center ">
                        {" "}
                        {formatNumber(data?.summary.totalRemainAmount || 0) ||
                          "0"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#f9f9f9]  w-full text-center ">
                    {data?.summary.totalRemainCount || "0"} Transaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
