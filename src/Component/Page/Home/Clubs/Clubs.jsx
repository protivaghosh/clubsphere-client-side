import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";

const Clubs = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs", search, category, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/clubs?search=${search}&category=${category}&sort=${sort}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary">
          Discover Local Clubs
        </h1>
        <p className="text-gray-600 mt-2">
          Join communities that match your passion
        </p>
      </div>

      {/* Search & Filter */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by club name..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Photography">Photography</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
          <option value="Music">Music</option>
        </select>

        <select
          className="select select-bordered w-full"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="latest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="lowFee">Lowest Fee</option>
          <option value="highFee">Highest Fee</option>
        </select>
      </div>

      {/* Clubs Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={club.bannerImage}
                alt={club.clubName}
                className="h-48 w-full object-cover"
              />

              {/* Status Badge */}
              <span
                className={`absolute top-3 right-3 badge badge-sm ${
                  club.status === "approved"
                    ? "badge-success"
                    : "badge-warning"
                }`}
              >
                {club.status}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold">
                {club.clubName}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="badge badge-outline badge-primary">
                  {club.category}
                </span>
                <span>📍 {club.location}</span>
              </div>

              <p className="font-medium text-gray-800">
                Membership Fee:{" "}
                <span className="text-primary">
                  {club.membershipFee === 0
                    ? "Free"
                    : `৳${club.membershipFee}`}
                </span>
              </p>

              <Link
                to={`/clubs/${club._id}`}
                className="btn btn-primary btn-sm w-full mt-3"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {clubs.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No clubs found.
        </p>
      )}
    </section>
  );
};

export default Clubs;
