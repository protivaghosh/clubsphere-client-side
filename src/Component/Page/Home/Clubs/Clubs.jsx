import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";

const Clubs = () => {
    const axiosSecure = useAxiosSecure();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/clubs")
      .then(res => {
        setClubs(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading clubs...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        All Clubs
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {clubs.map(club => (
          <div key={club._id} className="card bg-base-100 shadow-lg">
            <figure>
              <img
                src={club.bannerImage}
                alt={club.clubName}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">{club.clubName}</h3>
              <p className="text-sm text-gray-500">
                {club.category} • {club.location}
              </p>

              <p className="font-semibold">
                Fee: {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
              </p>

              <div className="card-actions justify-end">
                <Link to={`/clubs/${club._id}`} className="btn btn-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
