import React from "react";
import { Select, InputReadOnly, InputFormV2 } from "./";
import { useSelector } from "react-redux";

const targets = [
   { code: "Nam", value: "Nam" },
   { code: "Nữ", value: "Nữ" },
   { code: "Tất cả", value: "Tất cả" },
];

const Overview = ({ payload, setPayload, inValidFields, setInValidFields }) => {
   const { categories } = useSelector((state) => state.app);
   const { currentData } = useSelector((state) => state.user);
   const { dataEdit } = useSelector((state) => state.post);
   const handleFocus = () => {
      setInValidFields([]);
   };
   return (
      <div>
         <h2 className="font-semibold text-xl py-4">Thông tin mô tả</h2>
         <div className="w-full flex flex-col gap-4">
            <div className="w-1/2">
               <Select
                  setInValidFields={setInValidFields}
                  inValidFields={inValidFields}
                  value={payload.categoryCode}
                  setValue={setPayload}
                  name="categoryCode"
                  options={categories}
                  label="Loại chuyên mục"
               />
            </div>
            <InputFormV2
               value={payload.title}
               setValue={setPayload}
               name="title"
               label="Tiêu đề"
               setInValidFields={setInValidFields}
               inValidFields={inValidFields}
            />
            <div className="flex flex-col gap-2">
               <label htmlFor="desc">Nội dung mô tả</label>
               <textarea
                  id="desc"
                  cols="30"
                  rows="10"
                  className="w-full rounded-md outline-none border border-gray-300 p-2"
                  value={payload.description}
                  onChange={(e) => setPayload((prev) => ({ ...prev, description: e.target.value }))}
                  onFocus={() => handleFocus()}
               ></textarea>
               <small className="text-red-500 block w-full">
                  {inValidFields?.some((item) => item.name === "description") &&
                     inValidFields?.find((item) => item.name === "description")?.message}
               </small>
            </div>
            <div className="w-1/2 flex flex-col gap-4">
               <InputReadOnly
                  label="Thông tin liên hệ"
                  value={currentData?.name || currentData?.username}
               />
               <InputReadOnly label="Điện thoại" value={currentData?.phone} />
               <InputFormV2
                  setInValidFields={setInValidFields}
                  inValidFields={inValidFields}
                  value={payload.priceNumber}
                  setValue={setPayload}
                  small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
                  label="Giá cho thuê"
                  unit="đồng"
                  name="priceNumber"
               />
               <InputFormV2
                  setInValidFields={setInValidFields}
                  inValidFields={inValidFields}
                  value={payload.areaNumber}
                  setValue={setPayload}
                  name="areaNumber"
                  label="Diện tích"
                  unit="m2"
               />
               <Select
                  setInValidFields={setInValidFields}
                  inValidFields={inValidFields}
                  value={payload.target}
                  setValue={setPayload}
                  name="target"
                  options={targets}
                  label="Đối tượng cho thuê"
               />
            </div>
         </div>
      </div>
   );
};

export default Overview;
