import axiosInstance from "./axiosInstance";
export const createBooking = (data) => axiosInstance.post("/bookings", data);
export const getMyBookings = () => axiosInstance.get("/bookings/my");
export const updateBookingStatus = (id, status) => axiosInstance.patch(`/bookings/${id}/status`, { status });
