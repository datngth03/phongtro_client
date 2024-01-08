import React, { memo, useEffect, useState } from "react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

import icons from "../ultils/icons";
import GoogleMapReact from "google-map-react";

const Position = ({ icon }) => <div>{icon}</div>;
const { MdLocationOn } = icons;
const Map = ({ address }) => {
   const [coordinate, setCoordinate] = useState(null);
   useEffect(() => {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
         setCoordinate({ lat: latitude, lng: longitude });
      });
   }, []);
   useEffect(() => {
      if (address && window.google && window.google.maps) {
         const getCoord = async () => {
            try {
               const result = await geocodeByAddress(address);
               const latlng = await getLatLng(result[0]);
               setCoordinate(latlng);
            } catch (error) {
               console.error("Error fetching geocode:", error);
            }
         };
         getCoord();
      }
   }, [address]);

   return (
      <div style={{ height: "60vh", width: "100%" }}>
         {address && (
            <div>
               <span className="bg-white shadow-md text-gray-400 rounded-sm text-sm p-2 absolute top-[70px] left-[50px] w-[40%] z-10">
                  {address}
               </span>
            </div>
         )}
         <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
            defaultCenter={coordinate}
            defaultZoom={11}
            center={coordinate}
         >
            {coordinate && (
               <Position
                  lat={coordinate.lat}
                  lng={coordinate.lng}
                  icon={<MdLocationOn color="red" size="24px" />}
               />
            )}
         </GoogleMapReact>
      </div>
   );
};

export default memo(Map);
