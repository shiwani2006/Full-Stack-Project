import axiosInstance from "./axiosInstance";
export const getServices = () => axiosInstance.get("/services");
export const getProviderServices = (providerId) => axiosInstance.get(`/services?providerId=${providerId}`);
export const createService = (data) => axiosInstance.post("/services", data);
