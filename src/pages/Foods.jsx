import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import Sidebar from "../components/common/Sidebar";

import Topbar from "../components/common/Topbar";

import Loader from "../components/common/Loader";

import AddFoodModal from "../components/food/AddFoodModal";

import FoodTable from "../components/food/FoodTable";

import {
  getFoods,
} from "../features/foodSlice";

export default function Foods() {

  const dispatch = useDispatch();

  const [openModal, setOpenModal] =
    useState(false);

  const {
    foods,
    loading,
    error,
  } = useSelector(
    (state) => state.foods
  );

  useEffect(() => {

    dispatch(getFoods());

  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">

      <Sidebar />

      <AddFoodModal
        open={openModal}
        setOpen={setOpenModal}
      />

      <div className="flex-1 overflow-y-auto">

        <Topbar
          title="Food Management"
          subtitle="Manage all restaurant food items"
          buttonText="Add Food"
          onClick={() =>
            setOpenModal(true)
          }
        />

        {
          loading && <Loader />
        }

        <div className="p-8">

          {
            error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-5 py-4 rounded-2xl mb-6">

                {error}

              </div>
            )
          }

          <FoodTable
            foods={foods}
          />

        </div>

      </div>

    </div>
  );
}