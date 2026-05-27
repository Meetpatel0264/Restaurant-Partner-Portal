import {
  useEffect,
  useState,
  useMemo,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import Sidebar from "../components/common/Sidebar";

import Topbar from "../components/common/Topbar";

import Loader from "../components/common/Loader";

import AddFoodModal from "../components/food/AddFoodModal";

import FoodCard from "../components/food/FoodCard";

import {
  getFoods,
} from "../features/foodSlice";

import {
  FiSearch,
  FiX,
} from "react-icons/fi";

export default function Foods() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const dispatch = useDispatch();

  const [openModal, setOpenModal] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

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

  const categories =
    useMemo(() => {

      const allCategories =
        foods?.map(
          (food) =>
            food?.category
        );

      return [
        "All",
        ...new Set(allCategories),
      ];

    }, [foods]);

  const filteredFoods =
    useMemo(() => {

      return foods?.filter(
        (food) => {

          const searchText =
            search
              .toLowerCase()
              .trim();

          const titleMatch =
            food?.title
              ?.toLowerCase()
              ?.includes(
                searchText
              );

          const descMatch =
            food?.description
              ?.toLowerCase()
              ?.includes(
                searchText
              );

          const categoryMatch =
            food?.category
              ?.toLowerCase()
              ?.includes(
                searchText
              );

          const priceMatch =
            String(
              food?.price
            )?.includes(
              searchText
            );

          const statusMatch =
            (
              food?.isAvailable
                ? "available"
                : "unavailable"
            ).includes(
              searchText
            );

          const matchesSearch =
            titleMatch ||
            descMatch ||
            categoryMatch ||
            priceMatch ||
            statusMatch;

          const matchesCategory =
            categoryFilter ===
            "All" ||
            food?.category ===
            categoryFilter;

          const matchesStatus =
            statusFilter ===
            "All" ||
            (
              statusFilter ===
              "Available" &&
              food?.isAvailable
            ) ||
            (
              statusFilter ===
              "Unavailable" &&
              !food?.isAvailable
            );

          return (
            matchesSearch &&
            matchesCategory &&
            matchesStatus
          );
        }
      );

    }, [
      foods,
      search,
      categoryFilter,
      statusFilter,
    ]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">

      <>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() =>
              setSidebarOpen(false)
            }
          />
        )}

        <div
          className={`
      fixed top-0 left-0 h-screen z-50
      transform transition-transform duration-300
      ${sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            }
      lg:translate-x-0 lg:static
    `}
        >
          <Sidebar
            closeSidebar={() =>
              setSidebarOpen(false)
            }
          />
        </div>
      </>

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
          toggleSidebar={() =>
            setSidebarOpen(
              !sidebarOpen
            )
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

          <div className="bg-[#1b1b1b] border border-white/5 rounded-3xl p-5 mb-8">

            <div className="grid lg:grid-cols-3 gap-5">

              <div className="relative">

                <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                <input
                  type="text"
                  placeholder="Search title, description, category, price, status..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="w-full bg-[#222] border border-white/10 text-white rounded-2xl py-4 pl-14 pr-14 outline-none focus:border-red-500 transition"
                />

                {
                  search && (
                    <button
                      onClick={() =>
                        setSearch("")
                      }
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400"
                    >

                      <FiX />

                    </button>
                  )
                }

              </div>

              <select
                value={
                  categoryFilter
                }
                onChange={(e) =>
                  setCategoryFilter(
                    e.target.value
                  )
                }
                className="bg-[#222] border border-white/10 text-white rounded-2xl px-5 py-4 outline-none focus:border-red-500"
              >

                {
                  categories?.map(
                    (
                      category,
                      index
                    ) => (

                      <option
                        key={index}
                        value={category}
                      >

                        {category}

                      </option>

                    )
                  )
                }

              </select>

              <select
                value={
                  statusFilter
                }
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="bg-[#222] border border-white/10 text-white rounded-2xl px-5 py-4 outline-none focus:border-red-500"
              >

                <option value="All">
                  All Status
                </option>

                <option value="Available">
                  Available
                </option>

                <option value="Unavailable">
                  Unavailable
                </option>

              </select>

            </div>

            <div className="mt-5 flex items-center justify-between">

              <p className="text-gray-400">

                Showing
                {" "}
                <span className="text-white font-semibold">

                  {
                    filteredFoods?.length
                  }

                </span>
                {" "}
                food items

              </p>

              {
                (
                  search ||
                  categoryFilter !==
                  "All" ||
                  statusFilter !==
                  "All"
                ) && (
                  <button
                    onClick={() => {

                      setSearch("");

                      setCategoryFilter(
                        "All"
                      );

                      setStatusFilter(
                        "All"
                      );

                    }}
                    className="text-red-400 hover:text-red-300 transition"
                  >

                    Clear Filters

                  </button>
                )
              }

            </div>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {
              filteredFoods?.length >
                0 ? (

                filteredFoods?.map(
                  (food) => (

                    <FoodCard
                      key={food._id}
                      food={food}
                    />

                  )
                )

              ) : (

                <div className="col-span-full bg-[#1b1b1b] border border-white/5 rounded-3xl py-20 text-center">

                  <h1 className="text-3xl font-bold text-white">

                    No Food Found

                  </h1>

                  <p className="text-gray-400 mt-4">

                    Try different keyword or filters

                  </p>

                </div>

              )
            }

          </div>

        </div>

      </div>

    </div>
  );
}