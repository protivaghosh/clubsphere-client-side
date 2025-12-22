import React from 'react';
import UseAuth from '../../Page/Auth/UseAuth/UseAuth';
import UseRole from '../../Hooks/UseRole/UseRole';
import Loading from '../../Page/Loading/Loading';
import Forbidden from '../../Page/Home/Forbidden/Forbidden';


const ManagerRoute = ({ children }) => {
  const { loading } = UseAuth();
  const { role, roleLoading } = UseRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (role !== 'manager') {
    return <Forbidden />;
  }

  return children;
};

export default ManagerRoute;
