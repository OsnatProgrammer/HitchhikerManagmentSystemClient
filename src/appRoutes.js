
import React, { useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Orders from './components/orders/orders'
// import { useDispatch, useSelector } from 'react-redux'
// import { TOKEN_NAME, RESTAURNAT_ID } from './services/servise'
// import Loader from './components/ui/loader/loader'
// import { getUserInfo } from './redux/featchers/userSlice'
// import Logout from './components/auth/logout'
// import { getRestaurantInfo } from './redux/featchers/restaurantSlice'
// import FullItemMenu from './components/menu/fullItemMenu'
// import FullItemOrder from './components/orders/fullItemOrder'
// import AddItemMenu from './components/menu/addItemMenu'
// import EditItemMenu from './components/menu/editItemMenu'
// import FullTableItem from './components/tables/fullTableItem'
// import LayoutBarthender from './layoutBarthender/layoutBarthender'
// import LayoutShiftManager from './layoutShiftManager/layoutShiftManager'
// import LayoutCheker from './layoutCheker/layoutCheker'
import Counter from './components/counter'

// const RequestResetPass = React.lazy(() => import('./components/auth/requestResetPass'));
// const ResetPassword = React.lazy(() => import('./components/auth/resetPassword'));
const Home = React.lazy(() => import('./components/auth/home'));
const Login = React.lazy(() => import('./components/auth/login'));
const SignUp = React.lazy(() => import('./components/auth/signUp'));
const Messages = React.lazy(() => import('./components/admin_comps/messages'));
const Logout = React.lazy(() => import('./components/auth/logout'));

const GeneralLayout = React.lazy(() => import('./layouts/generalLayout'));
const UserLayout = React.lazy(() => import('./layouts/userLayout'));
// const AdminLayout = React.lazy(() => import('./layouts/'));




// const LayoutManager = React.lazy(() => import('./layoutManager/layoutManager'));
// const SuperLayout = React.lazy(() => import('./superLayout/superLayout'));
// const LayoutChef = React.lazy(() => import('./layoutChef/layoutChef'));
// const LayoutWaiter = React.lazy(() => import('./layoutWaiter/layoutWaiter'));
// const WorkerFill = React.lazy(() => import('./components/auth/workerFill'));
// const MyRestaurantsList = React.lazy(() => import('./components/auth/myRestaurantsList'));
// const NewRestaurant = React.lazy(() => import('./components/auth/newRestaurant'));
// const Messages = React.lazy(() => import('./components/messages'));
// const Menu = React.lazy(() => import('./components/menu/menu'));
// const Tables = React.lazy(() => import('./components/tables/tables'));
// const RestaurantSettings = React.lazy(() => import('./layoutManager/restaurantSettings/restaurantSettings'));
// const MyInfo = React.lazy(() => import('./components/worker/myInfo'));
// const Shifts = React.lazy(() => import('./components/shifts/shifts'));
// const Workers = React.lazy(() => import('./components/shifts/workers'));
// const AddWorker = React.lazy(() => import('./components/shifts/addWorker'));
// const AllWorkZone = React.lazy(() => import('./components/workZone/allWorkZone'));

const AppRoutes = () => {
    // const dispatch = useDispatch();

    // let { showiteminfo } = useSelector((state) => state.toggleSlice);
    // let { showadditem } = useSelector((state) => state.toggleSlice);
    // let { showorderiteminfo } = useSelector((state) => state.toggleSlice);
    // let { showEditItem } = useSelector((state) => state.toggleSlice);
    // let { showTableItem } = useSelector((state) => state.toggleSlice);
    // let { item } = useSelector((state) => state.toggleSlice);
    // let { TableItem } = useSelector((state) => state.toggleSlice);

    // useEffect(() => {
    //     if (localStorage.getItem(TOKEN_NAME)) {
    //         dispatch(getUserInfo())
    //         if (localStorage.getItem(RESTAURNAT_ID)) {
    //             dispatch(getRestaurantInfo())
    //         }
    //         // window.location.replace('http://localhost:3000/myrestaurantlist')
    //     }
    // }, [])

    return (
        // <Suspense fallback={
        //     <div className='w-full flex justify-center h-screen items-center'>

        //         <Loader />
        //     </div>
        // }
        // >

        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/messages/' element={<Messages />} />
                <Route path='/logout/' element={<Logout />} />

              

                    {/*  Layout */}
                    <Route path='/' element={<GeneralLayout />}>
                        {/* Outlet */}
                        {/* <Route path='/requestResetPass' element={<RequestResetPass />} />
                            <Route path='/resetPassword/:userId/:uniqueString' element={<ResetPassword />} /> */}
                        <Route path='/login' element={<Login />} />
                        <Route path='/signUp' element={<SignUp />} />

                    </Route>

                    {/* <Route path='/manager' element={<LayoutManager />}>
                            <Route path='/manager/usersList' element={< UserList />} />
                            <Route path='/manager/ridesList' element={< RidesList />} />
                            <Route path='/manager/messages' element={< Messages />} />
                            <Route path='/manager/myInfo' element={< MyInfo />} />
                            <Route path='/manager/Settings' element={< SystemSettings />} />
                            {/* <Route path='/manager/AllWorkZone' element={<AllWorkZone />} /> */}



                    {/* Outlet */}

                

                <Route path='/user' element={<UserLayout />}>
                    {/* <Route path='/user/myInfo' element={< MyInfo />} />
                    <Route path='/user/nearbyRides' element={< NearbyRides />} />
                    <Route path='/user/rideOffer' element={< RideOffer />} />
                    <Route path='/user/rideRequest' element={< RideRequest />} />
                    <Route path='/user/myRides' element={< MyRides />} />
                    <Route path='/user/messages' element={< Messages />} />
                    <Route path='/user/ridesHistory' element={< RidesHistory />} />
                    <Route path='/user/Settings' element={< SystemSettings />} />
             */}

                </Route> 
                       







            
            {/*   (*) => Rest of routes!?!?  */}
            {/* <Route path='*' element={<NotFound />} /> */}

        </Routes>
                {/* {showiteminfo ? <FullItemMenu key={item._id} item={item} /> : null}
                {showorderiteminfo ? <FullItemOrder key={item._id} item={item} /> : null}
                {showadditem ? <AddItemMenu /> : null}
                {showEditItem ? <EditItemMenu item={item} /> : null}
                {showTableItem ? <FullTableItem item={TableItem} /> : null} */}
            </Router >
        // </Suspense>
    )
}

export default AppRoutes;
