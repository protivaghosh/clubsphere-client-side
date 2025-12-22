import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure/useAxiosSecure';

const MemberClubs = () => {
  const axiosSecure = useAxiosSecure();
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    // Fetch memberships where the user has an active membership
    axiosSecure.get("/my-memberships").then(res => {
      setMemberships(res.data);
    }).catch(err => console.error(err));
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
                <span className={membership.status === 'Active' ? 'text-green-600' : 'text-red-600'}>
                  {membership.status}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Expiry Date: {new Date(membership.expiryDate).toLocaleDateString()}
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
