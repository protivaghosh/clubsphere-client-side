import { useEffect, useState } from "react";
import UseAuth from "../../Page/Auth/UseAuth/UseAuth";
import useAxiosSecure from "../UseAxiosSecure/useAxiosSecure";

const UseRole = () => {
  const { user, loading } = UseAuth();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email || loading) return;

    axiosSecure
      .get(`/users/role/${user.email}`)
      .then(res => {
        setRole(res.data.role);
        setRoleLoading(false);
      })
      .catch(() => {
        setRole(null);
        setRoleLoading(false);
      });
  }, [user, loading, axiosSecure]);

  return { role, roleLoading };
};

export default UseRole;
