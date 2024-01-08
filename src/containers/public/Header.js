import React from "react";
import logo from "../../assets/logowithoutbg.png";
import Button from "../../components/Button";
import User from "../../components/User";
import icons from "../../ultils/icons";
import memuSidebar from "../../ultils/menuSidebar";
import { formatVietnameseToString } from "../../ultils/Common/formatVietnameseToString";
import { useNavigate, useSearchParams, Link, useLocation } from "react-router-dom";
import { path } from "../../ultils/constant";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";

const { AiOutlinePlusCircle, AiOutlineLogout, BsChevronDown } = icons;
function Header() {
   const [isShowMenu, setIsShowMenu] = useState(false);
   const [searchParams] = useSearchParams();
   const location = useLocation();
   const headerRef = useRef();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { categories } = useSelector((state) => state.app);
   const { isLoggedIn } = useSelector((state) => state.auth);

   const goLogin = useCallback(
      (flag) => {
         const resetPayload = flag
            ? { phone: "", password: "", name: "" }
            : { phone: "", password: "" };
         navigate(path.LOGIN, { state: { flag, resetPayload } });
      },
      [navigate]
   );

   useEffect(() => {
      headerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
   }, [searchParams.get("page")]);

   useEffect(() => {
      const currentCategory = categories.find(
         (category) => location.pathname === `/${formatVietnameseToString(category.value)}`
      );

      if (currentCategory) {
         headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
   }, [categories, location.pathname]);

   const closeMenu = () => {
      setIsShowMenu(false);
   };
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (headerRef.current && !headerRef.current.contains(event.target)) {
            closeMenu();
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   return (
      <div ref={headerRef} className="w-4/5 ">
         <div className="w-full flex items-center justify-between">
            <Link to={"/"}>
               <img src={logo} alt="logo" className="w-[240px] h-[70px] object-contain" />
            </Link>
            <div className="flex items-center gap-1">
               {!isLoggedIn && (
                  <div className="flex items-center gap-1">
                     <small>Phongtro123.com xin chào !</small>
                     <Button
                        text={"Đăng nhập"}
                        textColor="text-white"
                        bgColor="bg-[#3961fb]"
                        onClick={() => goLogin(false)}
                     />
                     <Button
                        text={"Đăng ký"}
                        textColor="text-white"
                        bgColor="bg-[#3961fb]"
                        onClick={() => goLogin(true)}
                     />
                  </div>
               )}
               {isLoggedIn && (
                  <div className="flex items-center gap-3 relative">
                     <User />
                     <Button
                        text={"Quản lý tài khoản"}
                        textColor="text-white"
                        bgColor="bg-blue-700"
                        // Icon={BsChevronDown}
                        onClick={() => setIsShowMenu((prev) => !prev)}
                        underlineOnHover={true}
                        className="pr-4"
                     />
                     {isShowMenu && (
                        <div className="absolute min-w-200 top-full bg-white shadow-md rounded-md p-4 right-0 flex flex-col z-20">
                           {memuSidebar.map((item) => {
                              return (
                                 <Link
                                    className="hover:text-orange-500 flex items-center gap-2 text-blue-600 border-b border-gray-200 py-2"
                                    key={item.id}
                                    to={item?.path}
                                 >
                                    {item?.icon}
                                    {item.text}
                                 </Link>
                              );
                           })}
                           <span
                              className="cursor-pointer hover:text-orange-500 text-blue-500 py-2 flex items-center gap-2"
                              onClick={() => {
                                 setIsShowMenu(false);
                                 dispatch(actions.logout());
                              }}
                           >
                              <AiOutlineLogout />
                              Đăng xuất
                           </span>
                        </div>
                     )}
                  </div>
               )}
               <Button
                  text={"Đăng tin mới"}
                  textColor="text-white"
                  bgColor="bg-secondary2"
                  IcAfter={AiOutlinePlusCircle}
                  underlineOnHover={true}
                  onClick={() => navigate("/he-thong/tao-moi-bai-dang")}
               />
            </div>
         </div>
      </div>
   );
}

export default Header;
