import {
  FiPlus,
} from "react-icons/fi";

export default function Topbar({
  title,
  subtitle,
  buttonText,
  onClick,
}) {

  return (
    <div className="bg-[#171717] border-b border-white/5 px-8 py-6 flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-bold text-white">
          {title}
        </h1>

        <p className="text-gray-400 mt-2">
          {subtitle}
        </p>

      </div>

      {
        buttonText && (
          <button
            onClick={onClick}
            className="bg-red-500 hover:bg-red-600 transition px-6 py-4 rounded-2xl font-semibold flex items-center gap-3 text-white"
          >

            <FiPlus />

            {buttonText}

          </button>
        )
      }

    </div>
  );
}