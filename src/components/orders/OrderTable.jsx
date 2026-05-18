import {
  useDispatch,
} from "react-redux";

import {
  updateOrderStatus,
} from "../../features/orderSlice";

import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderTable({
  orders,
}) {

  const dispatch = useDispatch();

  const handleStatusChange = (
    orderId,
    status
  ) => {

    dispatch(
      updateOrderStatus({
        id: orderId,
        status,
      })
    );
  };

  return (
    <div className="bg-[#1b1b1b] rounded-3xl border border-white/5 overflow-hidden">

      <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">

        <h1 className="text-3xl font-bold text-white">
          Restaurant Orders
        </h1>

        <p className="text-gray-400">
          Total Orders:
          {" "}
          {orders?.length || 0}
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-[#222]">

            <tr>

              <th className="text-left px-8 py-5">
                Order ID
              </th>

              <th className="text-left px-8 py-5">
                Customer
              </th>

              <th className="text-left px-8 py-5">
                Foods
              </th>

              <th className="text-left px-8 py-5">
                Amount
              </th>

              <th className="text-left px-8 py-5">
                Status
              </th>

              <th className="text-left px-8 py-5">
                Change Status
              </th>

            </tr>

          </thead>

          <tbody>

            {
              orders?.length > 0 ? (

                orders?.map((order) => (

                  <tr
                    key={order._id}
                    className="border-t border-white/5 hover:bg-[#222] transition"
                  >

                    <td className="px-8 py-5 font-semibold text-white">

                      #
                      {
                        order?._id?.slice(
                          0,
                          8
                        )
                      }

                    </td>

                    <td className="px-8 py-5">

                      <div>

                        <h1 className="text-white font-semibold">

                          {
                            order?.user
                              ?.name ||
                            "Customer"
                          }

                        </h1>

                        <p className="text-gray-400 text-sm">

                          {
                            order?.user
                              ?.email
                          }

                        </p>

                      </div>

                    </td>

                    <td className="px-8 py-5">

                      <div className="space-y-2">

                        {
                          order?.items?.map(
                            (
                              item,
                              index
                            ) => (

                              <div
                                key={
                                  index
                                }
                                className="text-sm"
                              >

                                <span className="text-white">

                                  {
                                    item
                                      ?.food
                                      ?.title
                                  }

                                </span>

                                <span className="text-gray-400 ml-2">

                                  x
                                  {
                                    item?.quantity
                                  }

                                </span>

                              </div>

                            )
                          )
                        }

                      </div>

                    </td>

                    <td className="px-8 py-5 text-green-400 font-bold">

                      ₹
                      {
                        order?.totalPrice
                      }

                    </td>

                    <td className="px-8 py-5">

                      <OrderStatusBadge
                        status={
                          order?.status
                        }
                      />

                    </td>

                    <td className="px-8 py-5">

                      <select
                        value={
                          order?.status
                        }
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target
                              .value
                          )
                        }
                        className="bg-[#222] border border-white/10 text-white px-4 py-3 rounded-xl outline-none"
                      >

                        <option value="pending">
                          Pending
                        </option>

                        <option value="confirmed">
                          Confirmed
                        </option>

                        <option value="preparing">
                          Preparing
                        </option>

                        <option value="out_for_delivery">
                          Out For Delivery
                        </option>

                        <option value="delivered">
                          Delivered
                        </option>

                        <option value="cancelled">
                          Cancelled
                        </option>

                      </select>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-16 text-gray-400 text-lg"
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
  );
}