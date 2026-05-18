import {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import Sidebar from "../components/common/Sidebar";

import Topbar from "../components/common/Topbar";

import Loader from "../components/common/Loader";

import OrderTable from "../components/orders/OrderTable";

import {
  getOrders,
} from "../features/orderSlice";

export default function Orders() {

  const dispatch = useDispatch();

  const {
    orders,
    loading,
    error,
  } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {

    dispatch(getOrders());

  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">

      <Sidebar />

      <div className="flex-1 overflow-y-auto">

        <Topbar
          title="Orders Management"
          subtitle="Manage all restaurant orders"
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

          <OrderTable
            orders={orders}
          />

        </div>

      </div>

    </div>
  );
}