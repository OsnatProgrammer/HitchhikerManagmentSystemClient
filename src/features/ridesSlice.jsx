// // import { createSlice } from "@reduxjs/toolkit";

// // const initValue = {
// //   rides_ar: [],
// // };

// // const rideSlice = createSlice({
// //   name: "rides",
// //   initialState: initValue,
// //   reducers: {
// //     getride: (state, actions) => {
// //       state.rides_ar = state.rides_ar.concat(actions.payload.val);
// //     },
// //     chooseride: (state, actions) => {
// //       state.theride = actions.payload.ride;
// //     },
// //   },
// // });

// // export const { getride, chooseride } = rideSlice.actions;
// // export default rideSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import { getAllRidesById } from ""
// export const fetchRides = createAsyncThunk("rides/fetchRides", async () => {
//     try {
//         const rides = await getAllRidesById();
//         console.log(rides);
//         return rides;
//     } catch (err) {
//         throw new Error("Failed to fetch rides");
//     }
// });

// const ridesSlice = createSlice({
//     name: "rides",
//     initialState: {
//         rides: [],
//         isLoading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchRides.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(fetchRides.fulfilled, (state, action) => {
//                 state.rides = action.payload;
//                 state.isLoading = false;
//             })
//             .addCase(fetchRides.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.error.message;
//             });
//     },
// });

// export const ridesSelector = (state) => state.rides.rides;

// export const { reducer: ridesReducer } = ridesSlice;
