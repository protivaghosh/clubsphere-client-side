import React from 'react';
import UseAuth from '../../Auth/UseAuth/UseAuth';

const MemberOverview = () => {
  const { user } = UseAuth();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Welcome, {user?.displayName}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow p-6">
          <h3 className="font-semibold">My Clubs</h3>
          <p className="text-gray-500">Clubs you joined</p>
        </div>

        <div className="card bg-base-100 shadow p-6">
          <h3 className="font-semibold">My Events</h3>
          <p className="text-gray-500">Registered events</p>
        </div>

        <div className="card bg-base-100 shadow p-6">
          <h3 className="font-semibold">Membership</h3>
          <p className="text-gray-500">Active</p>
        </div>
      </div>
    </div>
  );
};

export default MemberOverview;