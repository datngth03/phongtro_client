import React, { useEffect, useState } from "react";
import { Overview, Address, Loading, Button, Map } from "../../components";
import { apiUploadImages } from "../../services";
import icons from "../../ultils/icons";
import { getCodes, getCodesArea } from "../../ultils/Common/getCodes";
import { apiCreatePosts, apiUpdatePosts } from "../../services";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { validate } from "../../ultils/Common/validateField";
import { resetData } from "../../store/actions";

const { BsCameraFill, ImBin } = icons;

const CreatePost = ({ isEdit }) => {
   const dispatch = useDispatch();
   const { dataEdit } = useSelector((state) => state.post);
   const [payload, setPayload] = useState({
      categoryCode: dataEdit?.categoryCode || "",
      title: dataEdit?.title || "",
      priceNumber: dataEdit?.priceNumber * 1000000 || 0,
      areaNumber: dataEdit?.areaNumber || 0,
      images: dataEdit?.images?.image ? JSON.parse(dataEdit?.images?.image) : "",
      imagesId: dataEdit?.imagesId,
      attributesId: dataEdit?.attributesId,
      featureId: dataEdit?.featureId,
      address: dataEdit?.address || "",
      priceCode: dataEdit?.priceCode || "",
      areaCode: dataEdit?.areaCode || "",
      description: dataEdit?.description ? JSON.parse(dataEdit?.description) : "",
      target: dataEdit?.features.target || "",
      province: dataEdit?.province || "",
   });

   const [imagesPreview, setImagesPreview] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const { prices, areas, categories, provinces } = useSelector((state) => state.app);
   const { currentData } = useSelector((state) => state.user);
   const [inValidFields, setInValidFields] = useState([]);

   const resetPayload = () => {
      setPayload({
         categoryCode: "",
         title: "",
         priceNumber: 0,
         areaNumber: 0,
         images: "",
         address: "",
         priceCode: "",
         areaCode: "",
         description: "",
         target: "",
         province: "",
      });
   };

   useEffect(() => {
      if (dataEdit) {
         let images = JSON.parse(dataEdit.images.image);
         setImagesPreview(images);
      }
   }, []);

   const handleFiles = async (e) => {
      e.stopPropagation();
      setIsLoading(true);
      let images = [];
      let files = e.target.files;
      let formData = new FormData();
      for (let i of files) {
         formData.append("file", i);
         formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME);
         let response = await apiUploadImages(formData);
         if (response.status === 200) images = [...images, response.data?.secure_url];
      }
      setIsLoading(false);
      setImagesPreview((prev) => [...prev, ...images]);
      setPayload((prev) => ({ ...prev, images: [...prev.images, ...images] }));
   };
   const handleDeleteImage = (image) => {
      setImagesPreview((prev) => prev?.filter((item) => item !== image));
      setPayload((prev) => ({
         ...prev,
         images: prev.images?.filter((item) => item !== image),
      }));
   };
   const handleSubmit = async () => {
      let priceCodeArr = getCodes(+payload.priceNumber / Math.pow(10, 6), prices, 1, 15);
      let priceCode = priceCodeArr[0]?.code;

      let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 20, 90);
      let areaCode = areaCodeArr[0]?.code;

      const finalPayload = {
         ...payload,
         priceCode,
         areaCode,
         userId: currentData.id,
         priceNumber: +payload.priceNumber / Math.pow(10, 6),
         label: `${categories.find((item) => item.code === payload?.categoryCode)?.value} ${
            payload?.address?.split(",")[0]
         }`,
      };
      const result = validate(finalPayload, setInValidFields);
      if (result === 0) {
         if (dataEdit && isEdit) {
            finalPayload.postId = dataEdit.id;

            const response = await apiUpdatePosts(finalPayload);

            if (response.data?.err === 0) {
               Swal.fire({
                  icon: "success",
                  title: "Thành công!",
                  text: "Tin đăng của bạn đã được cập nhật thành công.",
               }).then(() => {
                  resetPayload();
                  dispatch(resetData());
               });
            } else {
               Swal.fire({
                  icon: "error",
                  title: "Thất bại!",
                  text: "Đã xảy ra lỗi khi cập nhật. Vui lòng thử lại sau.",
               });
            }
         } else {
            const response = await apiCreatePosts(finalPayload);
            if (response.data?.err === 0) {
               Swal.fire({
                  icon: "success",
                  title: "Thành công!",
                  text: "Tin đăng của bạn đã được đăng thành công.",
               }).then(() => {
                  resetPayload();
               });
            } else {
               Swal.fire({
                  icon: "error",
                  title: "Thất bại!",
                  text: "Đã xảy ra lỗi khi đăng tin. Vui lòng thử lại sau.",
               });
            }
         }
      }
   };

   return (
      <div className="px-6">
         <h1 className="text-3xl font-medium py-4 border-b border-gray-200">Đăng tin mới</h1>
         <div className="flex gap-4">
            <div className="py-4 w-[70%] flex flex-col gap-8 flex-auto">
               <Address
                  inValidFields={inValidFields}
                  setInValidFields={setInValidFields}
                  payload={payload}
                  setPayload={setPayload}
               />
               <Overview
                  inValidFields={inValidFields}
                  setInValidFields={setInValidFields}
                  payload={payload}
                  setPayload={setPayload}
               />
               <div className="w-full mb-6">
                  <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
                  <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
                  <div className="w-full">
                     <label
                        className="w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md"
                        htmlFor="file"
                     >
                        {isLoading ? (
                           <Loading />
                        ) : (
                           <div className="flex flex-col items-center justify-center">
                              <BsCameraFill color="blue" size={50} />
                              Thêm ảnh
                           </div>
                        )}
                     </label>
                     <input onChange={handleFiles} hidden type="file" id="file" multiple />
                     <small className="text-red-500 block w-full">
                        {inValidFields?.some((item) => item.name === "images") &&
                           inValidFields?.find((item) => item.name === "images")?.message}
                     </small>
                     <div className="w-full">
                        <h3 className="font-medium py-4">Ảnh đã chọn</h3>
                        <div className="flex gap-4 items-center">
                           {imagesPreview?.map((item) => {
                              return (
                                 <div key={item} className="relative w-1/3 h-1/3 ">
                                    <img
                                       src={item}
                                       alt="preview"
                                       className="w-full h-full object-cover rounded-md"
                                    />
                                    <span
                                       title="Xóa"
                                       onClick={() => handleDeleteImage(item)}
                                       className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full"
                                    >
                                       <ImBin />
                                    </span>
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  </div>
               </div>
               <Button
                  onClick={handleSubmit}
                  text={isEdit ? "Cập nhật" : "Tạo mới"}
                  bgColor="bg-green-600"
                  textColor="text-white"
               />
            </div>
            <div className="w-[30%] flex flex-col relative">
               <Map address={payload.address} />
               <div className="bg-[#fff3cd] mt-8 p-4 rounded-md shadow-md text-[#856404]">
                  <h4 className="text-2xl font-medium">Lưu ý khi đăng tin</h4>
                  <ul className="list-disc p-4 text-justify">
                     <li>Nội dung phải viết bằng tiếng Việt có dấu</li>
                     <li>Tiêu đề tin không dài quá 100 kí tự</li>
                     <li>
                        Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.
                     </li>
                     <li>
                        Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí
                        tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí của tin rao.
                     </li>
                     <li>
                        Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao
                        không có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CreatePost;
