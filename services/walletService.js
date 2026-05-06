import axiosInstance from "./axiosInstance";
export const getWallet = () => axiosInstance.get("/wallet");
export const getTransactions = () => axiosInstance.get("/wallet/transactions");
export const addCredits = (data) => axiosInstance.post("/wallet/add-credits", data);
