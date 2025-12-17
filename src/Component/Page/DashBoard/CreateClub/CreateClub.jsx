import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure/useAxiosSecure";
import UseAuth from "../../Auth/UseAuth/UseAuth";

const CreateClub = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const clubData = {
      ...data,
      managerName: user?.displayName,
      managerEmail: user?.email,
      status: "pending",
      createdAt: new Date()
    };

    try {
      await axiosSecure.post("/clubs", clubData);
      Swal.fire("Success!", "Club created & waiting for admin approval", "success");
      reset();
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Create New Club
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          {...register("clubName", { required: true })}
          placeholder="Club Name"
          className="input input-bordered w-full"
        />

        <textarea
          {...register("description", { required: true })}
          placeholder="Club Description"
          className="textarea textarea-bordered w-full"
        />

        <select
          {...register("category", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select Category</option>
          <option>Photography</option>
          <option>Sports</option>
          <option>Tech</option>
          <option>Music</option>
        </select>

        <input
          {...register("location", { required: true })}
          placeholder="Location"
          className="input input-bordered w-full"
        />

        <input
          {...register("bannerImage", { required: true })}
          placeholder="Banner Image URL"
          className="input input-bordered w-full"
        />

        <input
          type="number"
          {...register("membershipFee", { required: true })}
          placeholder="Membership Fee (0 = Free)"
          className="input input-bordered w-full"
        />

        {/* Manager Info (Read Only) */}
        <input
          value={user?.displayName || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />

        <input
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />

        <button className="btn btn-primary w-full">
          Create Club
        </button>
      </form>
    </div>
  );
};

export default CreateClub;
