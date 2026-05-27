import {
  FiPlus,
  FiMenu,
} from "react-icons/fi";

export default function Topbar({
  title,
  subtitle,
  buttonText,
  onClick,
  toggleSidebar,
}) {
  return (
    <div className="bg-[#171717] border-b border-white/5 px-4 md:px-8 py-6 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="lg:hidden text-white text-2xl p-2 rounded-lg hover:bg-white/10 transition"
        >
          <FiMenu />
        </button>

        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            {title}
          </h1>

          <p className="text-gray-400 mt-2">
            {subtitle}
          </p>
        </div>

      </div>

      {buttonText && (
        <button
          onClick={onClick}
          className="bg-red-500 hover:bg-red-600 transition px-4 md:px-6 py-3 md:py-4 rounded-2xl font-semibold flex items-center gap-2 md:gap-3 text-white"
        >
          <FiPlus />

          <span className="hidden sm:block">
            {buttonText}
          </span>
        </button>
      )}

    </div>
  );
}