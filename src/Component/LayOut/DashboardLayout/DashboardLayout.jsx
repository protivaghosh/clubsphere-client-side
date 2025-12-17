import { NavLink, Outlet } from "react-router-dom";
import UseAuth from "../../Page/Auth/UseAuth/UseAuth";

const DashboardLayout = () => {
  
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 text-xl font-bold text-blue-600">
          Dashboard
        </div>

        <nav className="flex flex-col gap-2 px-4">
          {/* Admin Menu */}
          
            <>
              <NavLink to="" className="dashboard-link">
                Admin Overview
              </NavLink>
              <NavLink to="" className="dashboard-link">
                Manage Users
              </NavLink>
              <NavLink to="" className="dashboard-link">
                Manage Clubs
              </NavLink>
            </>
          

          {/* Club Manager Menu */}
         
            <>
              <NavLink to="" className="dashboard-link">
                Manager Overview
              </NavLink>
              <NavLink to="" className="dashboard-link">
                My Clubs
              </NavLink>
              <NavLink to="" className="dashboard-link">
                Create Club
              </NavLink>
              <NavLink to="" className="dashboard-link">
                Events
              </NavLink>
            </>
         

          {/* Member Menu */}
        
            <>
              <NavLink to="" className="dashboard-link">
                Member Overview
              </NavLink>
              <NavLink to="" className="dashboard-link">
                My Clubs
              </NavLink>
              <NavLink to="" className="dashboard-link">
                My Events
              </NavLink>
            </>
       
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
