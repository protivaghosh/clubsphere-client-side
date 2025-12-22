import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure/useAxiosSecure';

const MemberClubs = () => {
  const axiosSecure = useAxiosSecure();
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    // Fetch memberships from payments collection
    axiosSecure.get("/my-clubs-from-payments")
      .then(res => setMemberships(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Clubs</h2>

      {memberships.length === 0 ? (
        <p className="text-gray-500">You haven’t joined any club yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {memberships.map(membership => (
            <div key={membership._id} className="card bg-base-100 shadow p-6">
              <h3 className="font-semibold text-lg">{membership.clubName}</h3>
              <p className="text-sm text-gray-500">Location: {membership.location}</p>
              <p className="text-sm">
                Status:{" "}
                <span className="text-green-600">Active</span>
              </p>
              <p className="text-sm text-gray-500">
                Joined On: {new Date(membership.joinedAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Payment: ${membership.amount}
              </p>
              <Link 
                to={`/clubs/${membership.clubId}`} 
                className="mt-3 inline-block text-blue-500 hover:underline"
              >
                View Club Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberClubs;
