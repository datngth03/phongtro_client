import React, { memo, useEffect, useState } from "react";
import { Select, InputReadOnly } from "../components";
import { apiGetPublicProvinces, apiGetPublicDistrict } from "../services";
import { useSelector } from "react-redux";

const Address = ({ setPayload, inValidFields, setInValidFields }) => {
   const { dataEdit } = useSelector((state) => state.post);
   const [provinces, setProvinces] = useState([]);
   const [districts, setDistricts] = useState([]);
   const [reset, setReset] = useState(false);
   const [province, setProvince] = useState("");
   const [district, setDistrict] = useState("");

   useEffect(() => {
      const nameProvince =
         provinces.length > 0 &&
         provinces.find((item) => item.name === dataEdit?.address.split(",")[1]);
      setProvince(nameProvince ? nameProvince.code : "");
   }, [provinces]);

   useEffect(() => {
      if (districts) {
         const nameDistrict =
            districts.length > 0 &&
            districts.find((item) => item.name === dataEdit?.address.split(",")[0]);
         if (nameDistrict) {
            setDistrict(nameDistrict.code);
         }
      }
   }, [districts]);

   useEffect(() => {
      const fetchPublicProvince = async () => {
         const response = await apiGetPublicProvinces();
         if (response.status === 200) {
            setProvinces(response?.data);
         }
      };
      fetchPublicProvince();
   }, []);

   useEffect(() => {
      setDistrict("");
      const fetchPublicDistrict = async () => {
         const response = await apiGetPublicDistrict(province);
         if (response.status === 200) {
            setDistricts(response.data?.districts);
         }
      };
      province && fetchPublicDistrict();
      !province ? setReset(true) : setReset(false);
      !province && setDistricts([]);
   }, [province]);
   useEffect(() => {
      setPayload((prev) => ({
         ...prev,
         address: `${
            district ? `${districts?.find((item) => +item.code === +district)?.name},` : ""
         }${province ? provinces?.find((item) => +item.code === +province)?.name : ""}`,
         province: province ? provinces?.find((item) => +item.code === +province)?.name : "",
      }));
   }, [province, district]);
   return (
      <div>
         <h2 className="font-semibold text-xl py-4">Địa chỉ cho thuê</h2>
         <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
               <Select
                  setInValidFields={setInValidFields}
                  inValidFields={inValidFields}
                  type="province"
                  value={province}
                  setValue={setProvince}
                  options={provinces}
                  label="Tỉnh/Thành phố"
               />
               <Select
                  setInValidFields={setInValidFields}
                  inValidFields={inValidFields}
                  reset={reset}
                  type="district"
                  value={district}
                  setValue={setDistrict}
                  options={districts}
                  label="Quận/Huyện"
               />
            </div>
            <InputReadOnly
               label="Địa chỉ chính xác"
               value={`${
                  district ? `${districts?.find((item) => +item.code === +district)?.name}, ` : ""
               }${province ? provinces?.find((item) => +item.code === +province)?.name : ""}`}
            />
         </div>
      </div>
   );
};

export default memo(Address);
