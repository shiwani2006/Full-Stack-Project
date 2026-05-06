import axiosInstance from "./axiosInstance";

export const postServiceRequest = (data) =>
  axiosInstance.post("/service-requests", data);

export const getAllServiceRequests = (params) =>
  axiosInstance.get("/service-requests", { params });

export const getMyServiceRequests = () =>
  axiosInstance.get("/service-requests/my");

export const cancelServiceRequest = (id) =>
  axiosInstance.patch(`/service-requests/${id}/cancel`);

export const submitOffer = (serviceRequestId, data) =>
  axiosInstance.post(`/service-requests/${serviceRequestId}/offers`, data);

export const acceptOffer = (offerId) =>
  axiosInstance.patch(`/service-requests/offers/${offerId}/accept`);
