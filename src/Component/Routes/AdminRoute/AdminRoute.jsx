import React from 'react';
import UseAuth from '../../Page/Auth/UseAuth/UseAuth';
import UseRole from '../../Hooks/UseRole/UseRole';
import Loading from '../../Page/Loading/Loading';
import Forbidden from '../../Page/Home/Forbidden/Forbidden';


const AdminRoute = ({children}) => {
     const { loading } = UseAuth();
    const { role, roleLoading } = UseRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;