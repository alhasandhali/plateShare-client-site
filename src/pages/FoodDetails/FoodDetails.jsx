import axios from "axios";
import { useParams, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import usePageTitle from "../../utilities/setPageTitle/usePageTitle";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { use } from "react";
import { toast } from "react-toastify";

const FoodDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { user } = use(AuthContext);
  usePageTitle("Food Details");

  const { data: food, isLoading: foodLoading } = useQuery({
    queryKey: ["food", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/food/${id}`);
      return res.data;
    },
  });

  const { data: donator } = useQuery({
    queryKey: ["donator", food?.user_id],
    enabled: !!food?.user_id,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/user/${food.user_id}`);
      return res.data;
    },
  });

  const { data: requests = [] } = useQuery({
    queryKey: ["requests", id],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/requested-foods?food_id=${id}`
      );
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const requestMutation = useMutation({
    mutationFn: async (requestData) =>
      axios.post("http://localhost:3000/requested-food", requestData),
    onSuccess: () => {
      queryClient.invalidateQueries(["requests", id]);
      document.getElementById("foodRequestModal").close();
      reset();
      toast.success("Food request submitted!");
    },
  });

  const updateRequestStatus = useMutation({
    mutationFn: async ({ requestId, status }) => {
      await axios.patch(`http://localhost:3000/requested-food/${requestId}`, {
        status,
      });
      if (status === "accepted") {
        await axios.patch(`http://localhost:3000/food/${id}`, {
          food_status: "donated",
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["requests", id]);
      queryClient.invalidateQueries(["food", id]);
    },
  });

  if (foodLoading) return <CustomLoader />;
  if (!food)
    return (
      <div className="w-11/12 mx-auto py-10">
        <p className="montserrat mt-4 text-gradient font-semibold text-2xl leading-relaxed tracking-widest capitalize text-center">
          No food found.
        </p>
        <div className="flex justify-center mt-8">
          <Link to="/available-foods" className="themeBtn w-fit">
            <span className="w-auto px-6 py-3 font-semibold">Show All</span>
          </Link>
        </div>
      </div>
    );

  const isOwner = user?.email === donator?.email;

  const onSubmit = (data) => {
    const requestData = {
      ...data,
      food_id: id,
      user_name: user?.displayName,
      user_email: user?.email,
      user_image: user?.photoURL,
      status: "pending",
    };
    requestMutation.mutate(requestData);
  };

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-10 sm:py-16">
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <img
              src={food.food_image}
              alt={food.food_name}
              className="w-fit h-80 object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gradient mb-3">
              {food.food_name}
            </h1>
            <p>
              <b>Serves:</b> {food.food_quantity} people
            </p>
            <p>
              <b>Pickup:</b> {food.pickup_location}
            </p>
            <p>
              <b>Expires:</b> {food.expire_date}
            </p>
            <p className="text-justify">
              <b>Notes:</b> {food.additional_notes}
            </p>

            <div className="flex gap-3 flex-col md:flex-row mt-4">
              <p
                className={`px-4 py-2 text-center rounded-full font-semibold capitalize ${
                  food.food_status === "Available"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {food.food_status}
              </p>

              {food?.food_status !== "donated" && (
                <button
                  onClick={() => {
                    const modal = document.getElementById("foodRequestModal");
                    if (modal) modal.showModal();
                  }}
                  className="themeBtn w-full sm:w-auto mt-4 sm:mt-0"
                >
                  <span>Request Food</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {donator && (
          <div className="p-6 border-t border-gray-300 bg-gray-50 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gradient mb-2">
              Food Donator
            </h2>
            <div className="flex items-center gap-4">
              <img
                src={donator.image}
                alt={donator.name}
                className="w-20 h-20 rounded-full border-4 border-[#5dae61]"
              />
              <div>
                <p className="font-semibold">{donator.name}</p>
                <p className="text-gray-600 text-sm">{donator.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {isOwner && (
        <div className="pt-10">
          <h1 className="text-2xl font-bold mb-4">
            {food.food_name}'s Requests ({requests.length})
          </h1>
          <div className="overflow-x-auto rounded-lg border border-gray-300 shadow">
            <table className="min-w-full text-sm">
              <thead className="border-b border-gray-200 bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Receiver</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Reason</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r._id} className="border-b border-gray-200">
                    <td className="p-3 flex items-center gap-2">
                      <img
                        src={r.user_image}
                        alt={r.user_name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{r.user_name}</p>
                        <p className="text-gray-500 text-xs">{r.user_email}</p>
                      </div>
                    </td>
                    <td className="p-3">{r.location}</td>
                    <td className="p-3">{r.why_need_food}</td>
                    <td className="p-3 capitalize">{r.status}</td>
                    <td className="p-3 text-center">
                      {r.status === "pending" && (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              updateRequestStatus.mutate({
                                requestId: r._id,
                                status: "accepted",
                              })
                            }
                            className="px-3 py-1 bg-green-500 text-white rounded cursor-pointer"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              updateRequestStatus.mutate({
                                requestId: r._id,
                                status: "rejected",
                              })
                            }
                            className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <dialog
        id="foodRequestModal"
        className="modal fixed inset-0 z-50 flex justify-center items-center bg-black/50 p-4"
      >
        <div className="modal-box p-6 sm:p-8 relative">
          <button
            onClick={() => document.getElementById("foodRequestModal").close()}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold text-[#3b7d5e] mb-4 text-center">
            Request {food.food_name}
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <input
              {...register("location", { required: true })}
              placeholder="Your Location"
              className="border rounded px-4 py-2"
            />
            <textarea
              {...register("why_need_food", { required: true })}
              placeholder="Why do you need this food?"
              className="border rounded px-4 py-2"
              rows={3}
            />
            <input
              {...register("contact_no", { required: true })}
              placeholder="Contact Number"
              className="border rounded px-4 py-2"
            />
            <button type="submit" className="themeBtn w-full">
              <span>Submit Request</span>
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default FoodDetails;
