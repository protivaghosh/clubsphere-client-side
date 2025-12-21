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

    const fetchRole = async () => {
      try {
        console.log("Fetching role for:", user.email);

        const res = await axiosSecure.get(`/users/role/${user.email}`);

        console.log("Role response:", res.data);
        setRole(res.data.role);
      } catch (err) {
        console.error("Failed to fetch role:", err);
        setRole(null);
      } finally {
        setRoleLoading(false);
      }
    };

    fetchRole();
  }, [user, loading, axiosSecure]);

  return { role, roleLoading };
};

export default UseRole;
