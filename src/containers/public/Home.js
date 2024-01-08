import React from "react";
import Header from "./Header";
import { Navigation, Search } from "./index";
import { Intro, Contact } from "../../components";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../ultils/constant";

const Home = () => {
   const { isLoggedIn } = useSelector((state) => state.auth);
   const location = useLocation();
   return (
      <div className="w-full flex flex-col items-center h-full gap-6">
         <Header />
         <Navigation />
         {isLoggedIn &&
            location.pathname !== `/${path.CONTACT}` &&
            !location.pathname?.includes(path.DETAIL) && <Search />}
         <div className="w-4/5 lg:w-4/5 flex flex-col items-start justify-start mt-3">
            <Outlet />
         </div>
         <Intro />
         <Contact />
         <div className="h-[500px]"></div>
      </div>
   );
};

export default Home;
