import axios from "../axiosConfig";
import axiosDefault from "axios";

export const apiGetPrices = () =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axios({
            method: "get",
            url: "/api/v1/price/all",
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });
export const apiGetAreas = () =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axios({
            method: "get",
            url: "/api/v1/area/all",
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });
export const apiGetProvinces = () =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axios({
            method: "get",
            url: "/api/v1/province/all",
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });
export const apiGetPublicProvinces = () =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axiosDefault({
            method: "get",
            url: "https://provinces.open-api.vn/api/p",
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });
export const apiGetPublicDistrict = (provinceCode) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = await axiosDefault({
            method: "get",
            url: `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`,
         });
         resolve(response);
      } catch (error) {
         reject(error);
      }
   });
