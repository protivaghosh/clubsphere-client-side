import { Link, NavLink, Outlet } from "react-router-dom";
import UseRole from "../../Hooks/UseRole/UseRole";
import UseAuth from "../../Page/Auth/UseAuth/UseAuth";

const DashboardLayout = () => {
  const { user } = UseAuth();
  const { role, roleLoading } = UseRole();

  const navClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* STATIC SIDEBAR */}
      <aside className="w-64 bg-white shadow-md h-screen p-6 flex flex-col">
        <Link to='/' className="text-2xl font-bold text-blue-600 mb-6">ClubSphere</Link>

        {/* ADMIN MENU */}
        {role === "admin" && (
          <nav className="flex flex-col gap-2">
            <NavLink to="/dashboard/admin" className={navClass}>
              Admin Overview
            </NavLink>
            <NavLink to="/dashboard/admin/users" className={navClass}>
              Manage Users
            </NavLink>
            <NavLink to="/dashboard/admin/clubs" className={navClass}>
              Manage Clubs
            </NavLink>
          </nav>
        )}

        {/* MANAGER MENU */}
        {role === "manager" && (
          <nav className="flex flex-col gap-2">
            <NavLink to="/dashboard/manager" className={navClass}>
              Manager Overview
            </NavLink>
            <NavLink to="/dashboard/manager/my-clubs" className={navClass}>
              My Clubs
            </NavLink>
            <NavLink to="/dashboard/manager/create-club" className={navClass}>
              Create Club
            </NavLink>
            <NavLink to="/dashboard/manager/createEvents" className={navClass}>
              Create Event
            </NavLink>
            <NavLink to="/dashboard/manager/events" className={navClass}>
              Events
            </NavLink>
          </nav>
        )}

        {/* MEMBER MENU */}
        {role === "member" && (
          <nav className="flex flex-col gap-2">
            <NavLink to="/dashboard/member" className={navClass}>
              Member Overview
            </NavLink>
            <NavLink to="/dashboard/member/my-clubs" className={navClass}>
              My Clubs
            </NavLink>
            <NavLink to="/dashboard/member/events" className={navClass}>
              My Events
            </NavLink>
            <NavLink to="/dashboard/member/payment" className={navClass}>
              payment History
            </NavLink>
          </nav>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* TOP NAVBAR */}
        <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome, {user?.displayName || "User"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </div>

        {/* PAGE CONTENT */}
        <main className="p-6 flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
