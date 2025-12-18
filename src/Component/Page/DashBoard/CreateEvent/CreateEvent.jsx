import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";


const CreateEvent = () => {
    const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, watch } = useForm();
  const isPaid = watch("isPaid");

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/events", data);
      console.log(res.data);
      alert("Event Created Successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create event");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-md rounded-lg max-w-xl mx-auto">
      <input {...register("title")} placeholder="Event Title" className="input input-bordered w-full mb-3" />
      <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full mb-3" />
      <input type="date" {...register("eventDate")} className="input input-bordered w-full mb-3" />
      <input {...register("location")} placeholder="Location" className="input input-bordered w-full mb-3" />
      <label className="flex gap-2 items-center mb-3">
        <input type="checkbox" {...register("isPaid")} />
        Paid Event?
      </label>
      {isPaid && <input type="number" {...register("eventFee")} placeholder="Event Fee" className="input input-bordered w-full mb-3" />}
      <input type="number" {...register("maxAttendees")} placeholder="Max Attendees" className="input input-bordered w-full mb-3" />
      <button type="submit" className="btn btn-primary w-full">Create Event</button>
    </form>
  );
};

export default CreateEvent;
