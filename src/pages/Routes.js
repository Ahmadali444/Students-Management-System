import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react'


// import DashboardHeader from '../components/Header/dashboradHeader';
import { useAuthContext } from '../contexts/AuthContext'
import Auth from "./auth";
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from '../components/Header';
// import Profile from './Profile';
// import Settings from './Settings';

export default function Index() {
    const { isAuth } = useAuthContext();
    return (
        <>
            <Routes>
                <Route path='/' element={<PrivateRoute Component={Dashboard} />} />
                {/* <Route path='/' element={<Dashboard />} /> */}
                {/* <Route path='/profile/:id' element={<PrivateRoute Component={Profile} />} /> */}


                {/* {/* <Route path='/settings/:id' element={<PrivateRoute Component={Settings} />} /> */}
                <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to="/" />} />
            </Routes>

        </>
    )
}
