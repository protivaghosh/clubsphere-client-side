import { NavLink, Outlet, Link } from "react-router-dom";
import UseAuth from "../../Page/Auth/UseAuth/UseAuth";

const DashboardLayout = () => {
  const { user } = UseAuth();

  const navClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔹 TOP NAVBAR */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-full px-6 py-3 flex justify-between items-center">

          {/* Logo → Home */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Club<span className="text-gray-900">Sphere</span>
          </Link>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL}
              alt="user"
              className="w-9 h-9 rounded-full border"
            />
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {user?.displayName}
            </span>
          </div>
        </div>
      </div>

      {/* 🔹 DASHBOARD BODY */}
      <div className="flex">

        {/* SIDEBAR */}
        <aside className="w-64 bg-white shadow-md hidden md:block min-h-screen">
          <div className="p-6 text-lg font-semibold text-gray-800">
            Dashboard Menu
          </div>

          <nav className="flex flex-col gap-2 px-4">

            {/* ADMIN MENU */}
           
              <>
                <NavLink to="/dashboard/admin" className={navClass}>
                  Admin Overview
                </NavLink>
                <NavLink to="/dashboard/admin/users" className={navClass}>
                  Manage Users
                </NavLink>
                <NavLink to="/dashboard/admin/clubs" className={navClass}>
                  Manage Clubs
                </NavLink>
              </>
           

            {/* CLUB MANAGER MENU */}
           
              <>
                <NavLink to="/dashboard/manager" className={navClass}>
                  Manager Overview
                </NavLink>
                <NavLink to="/dashboard/manager/my-clubs" className={navClass}>
                  My Clubs
                </NavLink>
                <NavLink to="/dashboard/manager/create-club" className={navClass}>
                  Create Club
                </NavLink>
                <NavLink to="/dashboard/manager/events" className={navClass}>
                  Events
                </NavLink>
              </>
          

            {/* MEMBER MENU */}
           
              <>
                <NavLink to="/dashboard/member" className={navClass}>
                  Member Overview
                </NavLink>
                <NavLink to="/dashboard/member/my-clubs" className={navClass}>
                  My Clubs
                </NavLink>
                <NavLink to="/dashboard/member/events" className={navClass}>
                  My Events
                </NavLink>
              </>
           
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
