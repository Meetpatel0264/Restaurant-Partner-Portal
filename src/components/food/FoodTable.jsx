import {
  FiTrash2,
  FiEdit,
} from "react-icons/fi";

import {
  useDispatch,
} from "react-redux";

import {
  useState,
} from "react";

import {
  deleteFood,
} from "../../features/foodSlice";

import UpdateFoodModal from "./UpdateFoodModal";

export default function FoodTable({
  foods,
}) {

  const dispatch = useDispatch();

  const [editFood, setEditFood] =
    useState(null);

  const handleDelete = (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this food item?"
      );

    if (!confirmDelete) return;

    dispatch(deleteFood(id));
  };

  return (
    <>
      <UpdateFoodModal
        editFood={editFood}
        setEditFood={setEditFood}
      />

      <div className="bg-[#1b1b1b] rounded-3xl border border-white/5 overflow-hidden">

        <div className="px-8 py-6 border-b border-white/5">

          <h1 className="text-3xl font-bold text-white">
            Food Menu
          </h1>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#222]">

              <tr>

                <th className="text-left px-8 py-5">
                  Image
                </th>

                <th className="text-left px-8 py-5">
                  Title
                </th>

                <th className="text-left px-8 py-5">
                  Category
                </th>

                <th className="text-left px-8 py-5">
                  Price
                </th>

                <th className="text-left px-8 py-5">
                  Status
                </th>

                <th className="text-left px-8 py-5">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {
                foods?.length > 0 ? (

                  foods?.map((food) => (

                    <tr
                      key={food._id}
                      className="border-t border-white/5 hover:bg-[#222] transition"
                    >

                      <td className="px-8 py-5">

                        <img
                          src={
                            food?.image ||
                            "/food.png"
                          }
                          alt={food?.title}
                          className="w-16 h-16 rounded-xl object-cover"
                        />

                      </td>

                      <td className="px-8 py-5 text-white font-semibold">

                        {food?.title}

                      </td>

                      <td className="px-8 py-5 text-gray-300">

                        {food?.category}

                      </td>

                      <td className="px-8 py-5 text-green-400 font-semibold">

                        ₹{food?.price}

                      </td>

                      <td className="px-8 py-5">

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold
                          
                          ${food?.isAvailable
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

                      </td>

                      <td className="px-8 py-5">

                        <div className="flex items-center gap-3">

                          <button
                            onClick={() =>
                              setEditFood(
                                food
                              )
                            }
                            className="w-10 h-10 rounded-xl bg-blue-500/20 hover:bg-blue-500 transition flex items-center justify-center text-blue-400 hover:text-white"
                          >

                            <FiEdit />

                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                food._id
                              )
                            }
                            className="w-10 h-10 rounded-xl bg-red-500/20 hover:bg-red-500 transition flex items-center justify-center text-red-400 hover:text-white"
                          >

                            <FiTrash2 />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-12 text-gray-400"
                    >

                      No Food Items Found

                    </td>

                  </tr>

                )
              }

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}