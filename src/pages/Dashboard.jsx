import React from 'react'
import { useAuth } from '../hooks';
import { Admin, User } from '../components';

const Dashboard = () => {
    const { auth } = useAuth();
    const { role } = auth;

    if (role == "admin" || role == "owner") {
        return <Admin />
    } else {
        return <User />
    }
}

export default Dashboard
