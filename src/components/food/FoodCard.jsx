import {
  FiTrash2,
  FiEdit,
} from "react-icons/fi";

import {
  useDispatch,
} from "react-redux";

import {
  deleteFood,
} from "../../features/foodSlice";

export default function FoodCard({
  food,
}) {

  const dispatch = useDispatch();

  const handleDelete = () => {

    const confirmDelete =
      window.confirm(
        "Delete this food item?"
      );

    if (!confirmDelete) return;

    dispatch(deleteFood(food._id));
  };

  return (
    <div className="bg-[#1b1b1b] rounded-3xl overflow-hidden border border-white/5 hover:border-red-500 transition">

      <div className="relative">

        <img
          src={food?.image}
          alt={food?.title}
          className="w-full h-60 object-cover"
        />

        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">

          {food?.category}

        </div>

      </div>

      <div className="p-5">

        <div className="flex items-center justify-between">

          <h1 className="text-2xl font-bold text-white">

            {food?.title}

          </h1>

          <span className="text-green-400 font-bold text-xl">

            ₹{food?.price}

          </span>

        </div>

        <p className="text-gray-400 mt-4 line-clamp-2">

          {food?.description}

        </p>

        <div className="flex items-center justify-between mt-5">

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold
              
              ${
                food?.isAvailable
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }
              
              `}
          >

            {
              food?.isAvailable
                ? "Available"
                : "Unavailable"
            }

          </span>

          <div className="flex items-center gap-3">

            <button className="w-11 h-11 rounded-xl bg-blue-500/20 hover:bg-blue-500 transition flex items-center justify-center text-blue-400 hover:text-white">

              <FiEdit />

            </button>

            <button
              onClick={handleDelete}
              className="w-11 h-11 rounded-xl bg-red-500/20 hover:bg-red-500 transition flex items-center justify-center text-red-400 hover:text-white"
            >

              <FiTrash2 />

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}