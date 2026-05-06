import axiosInstance from "./axiosInstance";
export const getMyProfile = () => axiosInstance.get("/users/me");
export const updateMyProfile = (data) => axiosInstance.patch("/users/me", data);
export const getUsers = () => axiosInstance.get("/users");
export const blockUser = (id) => axiosInstance.patch(`/users/${id}/block`);
export const unblockUser = (id) => axiosInstance.patch(`/users/${id}/unblock`);

export const getUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
};

export const blockUser = async (id) => {
  const res = await axiosInstance.patch(`/users/${id}/block`);
  return res.data;
};

export const unblockUser = async (id) => {
  const res = await axiosInstance.patch(`/users/${id}/unblock`);
  return res.data;
};
