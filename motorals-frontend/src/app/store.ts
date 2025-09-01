import {configureStore} from "@reduxjs/toolkit"
import authReducer from "@/features/auth/authSlice";
import bikeReducer from "@/features/bikes/bikeSlice";
import bookingReducer from "@/features/bookings/bookingSlice";
import adminUsersReducer from "@/features/admin/users/userSlice";
import adminBookingsReducer from "@/features/admin/bookings/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bikes: bikeReducer,
    bookings: bookingReducer,
    adminUsers: adminUsersReducer,
    adminBookings: adminBookingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;