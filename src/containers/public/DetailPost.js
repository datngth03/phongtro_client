import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, createSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../store/actions";
// import { SlickSlider, BoxInfo, RelatedPost, Map } from "../../components";
import { SlickSlider, BoxInfo, RelatedPost } from "../../components";
import icons from "../../ultils/icons";
import { path } from "../../ultils/constant";

const { MdLocationOn, GiMoneyStack, RiCrop2Line, GoClock, CiHashtag, FaFlag } = icons;

const DetailPost = () => {
   const { postId } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { posts } = useSelector((state) => state.post || {});

   // useEffect(() => {
   //    window.scrollTo(0, 0);
   // }, []);

   useEffect(() => {
      postId && dispatch(getPostsLimit({ id: postId }));
   }, [postId]);

   const handleFilter = () => {
      let titleSearch = `Tìm kiếm tin đăng theo chuyên mục ${posts[0]?.labels?.value}`;
      navigate(
         {
            pathname: `/${path.SEARCH}`,
            search: createSearchParams({ labelCode: posts[0]?.labels?.code }).toString(),
         },
         { state: { titleSearch } }
      );
   };

   return (
      <div className="w-full flex gap-4">
         <div className="w-[70%] shadow-md rounded-bl-md rounded-br-md">
            <SlickSlider
               images={posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)}
            />
            <div className="flex flex-col gap-2 p-6">
               <h1 className="text-xl font-bold text-red-500 my-2 pt-4">{posts[0]?.title}</h1>
               <div>
                  <span>Chuyên mục: </span>
                  <span
                     onClick={handleFilter}
                     className="text-blue-700 underline font-semibold hover:text-orange-600 cursor-pointer"
                  >
                     {posts[0]?.labels?.value}
                  </span>
               </div>
               <div className="flex items-center">
                  <MdLocationOn style={{ color: "blue" }} />
                  <address>{posts[0]?.address}</address>
               </div>
               <div className="flex items-center justify-between w-4/5">
                  <span className="flex items-center gap-1">
                     <GiMoneyStack style={{ color: "grey" }} />
                     <span className="text-green-500 text-xl font-bold">
                        {posts[0]?.attributes.price}
                     </span>
                  </span>
                  <span className="flex items-center gap-1">
                     <RiCrop2Line style={{ color: "grey" }} />
                     <span>{posts[0]?.attributes.acreage}</span>
                  </span>
                  <span className="flex items-center gap-1">
                     <GoClock style={{ color: "grey" }} />
                     <span>{posts[0]?.attributes.published}</span>
                  </span>
                  <span className="flex items-center gap-1">
                     <CiHashtag style={{ color: "grey" }} />
                     <span>{posts[0]?.attributes.hashtag}</span>
                  </span>
               </div>
            </div>
            <div className="flex flex-col p-6 pt-0">
               <h2 className="font-semibold text-xl pb-4">Thông tin mô tả</h2>
               <div className="flex flex-col gap-3">
                  {posts[0]?.description && posts[0]?.description.length > 0 ? (
                     Array.isArray(JSON.parse(posts[0]?.description)) ? (
                        JSON.parse(posts[0]?.description).map((item, index) => (
                           <span key={index}>{item}</span>
                        ))
                     ) : (
                        <span>{JSON.parse(posts[0]?.description)}</span>
                     )
                  ) : (
                     <span>No description available</span>
                  )}
               </div>
            </div>
            <div className="flex flex-col p-6 pt-0">
               <h2 className="font-semibold text-xl pb-4">Đặc điểm tin đăng</h2>
               <table>
                  <tbody>
                     <tr className="p-2 ">
                        <td className="p-4">Mã tin:</td>
                        <td>{posts[0]?.features?.code}</td>
                     </tr>
                     <tr className="p-2 bg-[#eee]">
                        <td className="p-4">Khu vực:</td>
                        <td>{posts[0]?.features?.area}</td>
                     </tr>
                     <tr className="p-2 ">
                        <td className="p-4">Loại tin rao:</td>
                        <td>{posts[0]?.features?.type}</td>
                     </tr>
                     <tr className="p-2 bg-[#eee]">
                        <td className="p-4">Đối tượng thuê:</td>
                        <td>{posts[0]?.features?.target}</td>
                     </tr>
                     <tr className="p-2 ">
                        <td className="p-4">Gói tin:</td>
                        <td className="text-blue-700">{posts[0]?.features?.bonus}</td>
                     </tr>
                     <tr className="p-2 bg-[#eee]">
                        <td className="p-4">Ngày đăng:</td>
                        <td>{posts[0]?.features?.created}</td>
                     </tr>
                     <tr className="p-2 ">
                        <td className="p-4">Ngày hết hạn: </td>
                        <td>{posts[0]?.features?.expired}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div className="flex flex-col p-6 pt-0">
               <h2 className="font-semibold text-xl pb-4">Thông tin liên hệ</h2>
               <table>
                  <tbody>
                     <tr className="p-2 ">
                        <td className="p-4">Liên hệ:</td>
                        <td>{posts[0]?.user?.name}</td>
                     </tr>
                     <tr className="p-2 bg-[#eee]">
                        <td className="p-4">Điện thoại:</td>
                        <td>{posts[0]?.user?.phone}</td>
                     </tr>
                     <tr className="p-2 ">
                        <td className="p-4">Zalo:</td>
                        <td>{posts[0]?.user?.zalo}</td>
                     </tr>
                  </tbody>
               </table>
            </div>
            <div className="flex flex-col p-6 pt-0 relative">
               <h2 className="font-semibold text-xl pb-4">Bản đồ</h2>
               {/* {posts[0] && <Map address={posts[0].address} />} */}
               {posts[0]}

               <div className="pt-8 text-gray-500">
                  Bạn đang xem nội dung tin đăng:{" "}
                  <span className="italic">{`"${posts[0]?.title} - Mã tin: ${posts[0]?.features?.code}"`}</span>
                  . Mọi thông tin liên quan đến tin đăng này chỉ mang tính chất tham khảo. Nếu bạn
                  có phản hồi với tin đăng này (báo xấu, tin đã cho thuê, không liên lạc được,...),
                  vui lòng thông báo để PhòngTrọ123 có thể xử lý.
               </div>
               <div className="font-bold text-blue-600 border-blue-600 border-[0.07rem] rounded-md w-[25%] flex gap-1 justify-center items-center p-2 my-4">
                  <FaFlag color="blue" />
                  <Link target="_blank" to="/lien-he">
                     Gửi phản hồi
                  </Link>
               </div>
            </div>
         </div>
         <div className="w-[30%] flex flex-col gap-8">
            {posts && posts.length > 0 ? <BoxInfo user={posts[0]?.user} /> : <p>No post found</p>}
            <RelatedPost />
            <RelatedPost newPost />
         </div>
      </div>
   );
};

export default DetailPost;
