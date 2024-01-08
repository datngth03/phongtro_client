import useReducer from "./userReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import postReducer from "./postReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import persistReducer from "redux-persist/lib/persistReducer";

const commonConfig = {
   storage,
   stateReconciler: autoMergeLevel2,
};

const authConfig = {
   ...commonConfig,
   key: "auth",
   whitelist: ["isLoggedIn", "token"],
};

const rootReducer = combineReducers({
   auth: persistReducer(authConfig, authReducer),
   user: useReducer,
   app: appReducer,
   post: postReducer,
});

export default rootReducer;
