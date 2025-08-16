

import axios from "axios";

// Create an Axios instance
const api = axios.create({
  //baseURL: "http://163.172.147.74/dev/web/v1",
  baseURL: "https://api.vlu.co.ke/dev/web/v1",
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;


// import { isString } from "lodash";
// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router";
// import useAuth from "./auth";
// // import useNavigationIntent from "./navigation-intent";
// import {
//   api,
//   registerRequestInterceptor,
//   registerResponseInterceptor,
// } from "../services/api";
// import { IAuth } from "../types/auth";

// export default function useAPI() {
//   const auth = useAuth();
//   const navigate = useNavigate();
// //    const location = useLocation();
// //   const { intend } = useNavigationIntent();
//   const [resolver, setResolver] = useState<(auth: IAuth) => void>(() => void 0);

//   useEffect(() => {
//     let rejecter: (reason: any) => void = () => {};
//     registerRequestInterceptor(
//       new Promise((resolve, reject) => {
//         setResolver(resolve);
//         rejecter = reject;
//       })
//     );
//     registerResponseInterceptor(async (error:any) => {
//       if (isString(error.config?.headers.Authorization) && auth.authenticated) {
//      navigate("/dashboard")
//         // auth.deauthenticate();
//         // .then(() => {
       
//         // });
//       }
//       throw new Error("Something went wrong. Request aborted.");
//     });
//     return () => {
//       rejecter(new Error("Request cancelled"));
//     };
//   }, []);

//   useEffect(() => {
//     if (resolver instanceof Function) resolver(auth);
//     else registerRequestInterceptor(Promise.resolve(auth));
//   }, [auth.authenticated]);

//   return api;
// }
