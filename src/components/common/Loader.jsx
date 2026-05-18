export default function Loader() {

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="flex flex-col items-center">

        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>

        <h1 className="text-white text-xl font-semibold mt-5">
          Loading...
        </h1>

      </div>

    </div>
  );
}