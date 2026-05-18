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

import {
  getFoods,
} from "../features/foodSlice";

import {
  getOrders,
} from "../features/orderSlice";

import {
  FiShoppingBag,
  FiDollarSign,
  FiUsers,
  FiStar,
} from "react-icons/fi";

export default function Dashboard() {

  const dispatch = useDispatch();

  const [openModal, setOpenModal] =
    useState(false);

  const { user } =
    useSelector((state) => state.auth);

  const {
    foods,
    loading: foodLoading,
  } = useSelector(
    (state) => state.foods
  );

  const {
    orders,
    loading: orderLoading,
  } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {

    dispatch(getFoods());

    dispatch(getOrders());

  }, []);

  const totalRevenue =
    orders?.reduce(
      (acc, item) =>
        acc +
        (item?.totalPrice || 0),
      0
    );

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">

      <Sidebar />

      <AddFoodModal
        open={openModal}
        setOpen={setOpenModal}
      />

      <div className="flex-1 overflow-y-auto">

        <Topbar
          title="Dashboard"
          subtitle="Restaurant analytics & management"
          buttonText="Add Food"
          onClick={() =>
            setOpenModal(true)
          }
        />

        {
          (foodLoading ||
            orderLoading) && (
            <Loader />
          )
        }

        <div className="p-8">

          <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl p-10 relative overflow-hidden">

            <div className="absolute top-[-50px] right-[-50px] w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

              <div>

                <h1 className="text-5xl font-bold leading-tight text-white">

                  Welcome,
                  <h1>
                  {user?.name}
                  </h1>

                </h1>

                <p className="mt-5 text-white/90 text-lg leading-8 max-w-xl">

                  Track orders, manage menu,
                  monitor revenue and grow
                  your restaurant business.

                </p>

              </div>

              <img
                src={
                  user?.image ||
                  "/user.png"
                }
                alt="profile"
                className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-2xl"
              />

            </div>

          </div>

        </div>

        <div className="px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-[#1b1b1b] rounded-3xl p-8 border border-white/5 hover:border-red-500 transition">

            <FiShoppingBag className="text-5xl text-red-500 mb-5" />

            <h1 className="text-4xl font-bold text-white">

              {orders?.length || 0}

            </h1>

            <p className="text-gray-400 mt-2">
              Total Orders
            </p>

          </div>

          <div className="bg-[#1b1b1b] rounded-3xl p-8 border border-white/5 hover:border-green-500 transition">

            <FiDollarSign className="text-5xl text-green-400 mb-5" />

            <h1 className="text-4xl font-bold text-white">

              ₹{totalRevenue}

            </h1>

            <p className="text-gray-400 mt-2">
              Total Revenue
            </p>

          </div>

          <div className="bg-[#1b1b1b] rounded-3xl p-8 border border-white/5 hover:border-blue-500 transition">

            <FiUsers className="text-5xl text-blue-400 mb-5" />

            <h1 className="text-4xl font-bold text-white">

              {foods?.length || 0}

            </h1>

            <p className="text-gray-400 mt-2">
              Total Foods
            </p>

          </div>

          <div className="bg-[#1b1b1b] rounded-3xl p-8 border border-white/5 hover:border-yellow-500 transition">

            <FiStar className="text-5xl text-yellow-400 mb-5" />

            <h1 className="text-4xl font-bold text-white">
              4.8
            </h1>

            <p className="text-gray-400 mt-2">
              Restaurant Rating
            </p>

          </div>

        </div>

        <div className="p-8">

          <div className="bg-[#1b1b1b] rounded-3xl border border-white/5 overflow-hidden">

            <div className="px-8 py-6 border-b border-white/5">

              <h1 className="text-3xl font-bold text-white">
                Recent Orders
              </h1>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-[#222]">

                  <tr>

                    <th className="text-left px-8 py-5 text-gray-300">
                      Order ID
                    </th>

                    <th className="text-left px-8 py-5 text-gray-300">
                      Customer
                    </th>

                    <th className="text-left px-8 py-5 text-gray-300">
                      Amount
                    </th>

                    <th className="text-left px-8 py-5 text-gray-300">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {
                    orders?.length > 0 ? (

                      orders
                        ?.slice(0, 5)
                        ?.map((order) => (

                          <tr
                            key={order._id}
                            className="border-t border-white/5 hover:bg-[#222] transition"
                          >

                            <td className="px-8 py-5 text-white font-semibold">

                              #
                              {
                                order?._id?.slice(
                                  0,
                                  8
                                )
                              }

                            </td>

                            <td className="px-8 py-5 text-gray-300">

                              {
                                order?.user
                                  ?.name ||
                                "Customer"
                              }

                            </td>

                            <td className="px-8 py-5 text-green-400 font-bold">

                              ₹
                              {
                                order?.totalPrice
                              }

                            </td>

                            <td className="px-8 py-5">

                              <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-semibold capitalize">

                                {
                                  order?.status
                                }

                              </span>

                            </td>

                          </tr>

                        ))

                    ) : (

                      <tr>

                        <td
                          colSpan="4"
                          className="text-center py-10 text-gray-400"
                        >

                          No Orders Found

                        </td>

                      </tr>

                    )
                  }

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}