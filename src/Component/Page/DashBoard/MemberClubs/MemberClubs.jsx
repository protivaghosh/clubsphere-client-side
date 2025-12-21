import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure/useAxiosSecure';

const MemberClubs = () => {
     const axiosSecure = useAxiosSecure();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axiosSecure.get("/my-clubs").then(res => {
      setClubs(res.data);
    });
  }, [axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Clubs</h2>

      {clubs.length === 0 && (
        <p className="text-gray-500">You haven’t joined any club yet.</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {clubs.map(club => (
          <div key={club._id} className="card bg-base-100 shadow p-6">
            <h3 className="font-semibold">{club.clubName}</h3>
            <p className="text-sm text-gray-500">{club.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberClubs;