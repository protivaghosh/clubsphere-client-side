import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const CreateEvent = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, watch, reset } = useForm();
  const [myClubs, setMyClubs] = useState([]);
  const isPaid = watch("isPaid");

  // Fetch manager's clubs
  useEffect(() => {
    axiosSecure.get("/manager/my-clubs")
      .then(res => setMyClubs(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure]);

  const onSubmit = async (data) => {
    if (!data.clubId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a club!",
        confirmButtonColor: "#EF4444",
      });
      return;
    }

    try {
      const res = await axiosSecure.post("/events", data);
      console.log(res.data);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Event Created Successfully!",
        confirmButtonColor: "#2563EB",
      });

      reset(); // Clear the form
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create event",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white shadow-md rounded-lg max-w-xl mx-auto"
    >
      <select {...register("clubId")} className="input input-bordered w-full mb-3">
        <option value="">Select Club</option>
        {myClubs.map(club => (
          <option key={club._id} value={club._id}>
            {club.clubName}
          </option>
        ))}
      </select>

      <input
        {...register("title")}
        placeholder="Event Title"
        className="input input-bordered w-full mb-3"
      />
      <textarea
        {...register("description")}
        placeholder="Description"
        className="textarea textarea-bordered w-full mb-3"
      />
      <input
        type="date"
        {...register("eventDate")}
        className="input input-bordered w-full mb-3"
      />
      <input
        {...register("location")}
        placeholder="Location"
        className="input input-bordered w-full mb-3"
      />
      <label className="flex gap-2 items-center mb-3">
        <input type="checkbox" {...register("isPaid")} />
        Paid Event?
      </label>
      {isPaid && (
        <input
          type="number"
          {...register("eventFee")}
          placeholder="Event Fee"
          className="input input-bordered w-full mb-3"
        />
      )}
      <input
        type="number"
        {...register("maxAttendees")}
        placeholder="Max Attendees"
        className="input input-bordered w-full mb-3"
      />
      <button type="submit" className="btn btn-primary w-full">
        Create Event
      </button>
    </form>
  );
};

export default CreateEvent;
