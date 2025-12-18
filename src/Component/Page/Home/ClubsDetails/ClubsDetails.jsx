import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/clubs/${id}`)
      .then(res => setClub(res.data));
  }, [id]);

  if (!club) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={club.bannerImage} className="rounded-lg mb-6" />
      <h2 className="text-3xl font-bold">{club.clubName}</h2>
      <p className="text-gray-600">{club.category} • {club.location}</p>
      <p className="mt-4">{club.description}</p>
      <p className="mt-4 font-semibold">
        Membership Fee: {club.membershipFee === 0 ? "Free" : `$${club.membershipFee}`}
      </p>
    </div>
  );
};

export default ClubDetails;
