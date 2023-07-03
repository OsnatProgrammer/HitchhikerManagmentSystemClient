
import React, { useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import UserLayout from './layouts/userLayout';
import GeneralLayout from './layouts/generalLayout';
import Home from './components/auth/home';
import Login from './components/auth/login';
import SignUp from './components/auth/signUp';
import AdminLayout from './layouts/adminLayout';
import MyInfo from './components/general_comps/myInfo';
import NearbyRides from './components/user_comps/nearbyRides';
import RideOffer from './components/user_comps/rideOffer';
import RideRequest from './components/user_comps/rideRequest';
import MyRides from './components/user_comps/myRides';
import Messages from './components/general_comps/messages';
import MessageDetails from './components/general_comps/messageDetails';
import RidesHistory from './components/user_comps/ridesHistory';
import Logout from './components/auth/logout';
import UsersList from './components/admin_comps/usersList';
import RidesList from './components/admin_comps/ridesList';
import PrivacyPolicy from './components/general_comps/privacyPolicy';
import HomeManager from './components/admin_comps/homeManager';

// import RidesHistoryDetails from './components/user_comps/ridesHistoryDetails';
// import PopUp from './components/user_comps/popup';

const AppRoutes = () => {

    return (

        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/privacyPolicy' element={<PrivacyPolicy/>} />

                {/*  Layout */}
                <Route path='/' element={<GeneralLayout />}>
                    {/* Outlet */}
                    {/* <Route path='/requestResetPass' element={<RequestResetPass />} />
                            <Route path='/resetPassword/:userId/:uniqueString' element={<ResetPassword />} /> */}
                    <Route path='/login' element={<Login />} />
                    <Route path='/signUp' element={<SignUp />} />

                </Route>

                <Route path='/manager' element={<AdminLayout />}>
                    <Route path='/manager' element={< HomeManager />} />
                    <Route path='/manager/usersList' element={< UsersList />} />
                    <Route path='/manager/ridesList' element={< RidesList />} />
                    <Route path='/manager/messages' element={< Messages />} />
                    <Route path='/manager/myInfo' element={< MyInfo />} />
                    {/* <Route path='/manager/Settings' element={< SystemSettings />} /> */}
                </Route>

                <Route path='/user' element={<UserLayout />}>
                    {/* Outlet */}
                    <Route path='/user/myInfo' element={< MyInfo />} />
                    <Route path='/user' element={< NearbyRides />} />
                    <Route path='/user/rideOffer' element={< RideOffer />} />
                    <Route path='/user/rideRequest' element={< RideRequest />} />
                    <Route path='/user/myRides' element={< MyRides />} />
                    <Route path='/user/messages' element={< Messages />} />
                    <Route path='/user/message-details/:id' element={<MessageDetails />} />
                    <Route path='/user/ridesHistory' element={< RidesHistory />} />
                    {/* <Route path='/user/popup' element={<  PopUp/>} /> */}
                    {/* <Route path='/user/ridesHistoryDetails/:id' element={< RidesHistoryDetails />} /> */}
                    {/* <Route path='/user/ridesHistoryDetails/:item' component={RidesHistoryDetails} /> */}
                    <Route path='/user/logout' element={<Logout />} />
                    {/* <Route path='/user/Settings' element={< SystemSettings />} /> */}
                </Route>

            </Routes>
        </Router >
    )
}

export default AppRoutes;
