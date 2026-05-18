export default function OrderStatusBadge({
  status,
}) {

  const getStatusStyle = () => {

    switch (status) {

      case "pending":
        return "bg-yellow-500/20 text-yellow-400";

      case "confirmed":
        return "bg-blue-500/20 text-blue-400";

      case "preparing":
        return "bg-orange-500/20 text-orange-400";

      case "out_for_delivery":
        return "bg-purple-500/20 text-purple-400";

      case "delivered":
        return "bg-green-500/20 text-green-400";

      case "cancelled":
        return "bg-red-500/20 text-red-400";

      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <span
      className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${getStatusStyle()}`}
    >

      {
        status ===
        "out_for_delivery"
          ? "Out For Delivery"
          : status
      }

    </span>
  );
}