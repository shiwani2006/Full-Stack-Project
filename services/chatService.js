import axiosInstance from "./axiosInstance";
export const getChats = () => axiosInstance.get("/chats");