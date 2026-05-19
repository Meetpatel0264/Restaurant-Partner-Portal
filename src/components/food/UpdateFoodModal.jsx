import {
  useState,
  useEffect,
} from "react";

import {
  useDispatch,
} from "react-redux";

import {
  FiX,
} from "react-icons/fi";

import {
  updateFood,
} from "../../features/foodSlice";

export default function UpdateFoodModal({
  editFood,
  setEditFood,
}) {

  const dispatch = useDispatch();

  const [formData, setFormData] =
    useState({
      title: "",
      price: "",
      category: "",
      description: "",
      isAvailable: true,
      image: null,
    });

  const [preview, setPreview] =
    useState("");

  useEffect(() => {

    if (editFood) {

      setFormData({
        title:
          editFood?.title || "",

        price:
          editFood?.price || "",

        category:
          editFood?.category || "",

        description:
          editFood?.description || "",

        isAvailable:
          editFood?.isAvailable ??
          true,

        image: null,
      });

      setPreview(
        editFood?.image || ""
      );
    }

  }, [editFood]);

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImage = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      image: file,
    });

    setPreview(
      editFood?.image
        ? `https://zomato-clone-api-5e4m.onrender.com${editFood.image}`
        : ""
    );
  };

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    const data =
      new FormData();

    data.append(
      "title",
      formData.title
    );

    data.append(
      "price",
      formData.price
    );

    data.append(
      "category",
      formData.category
    );

    data.append(
      "description",
      formData.description
    );

    data.append(
      "isAvailable",
      formData.isAvailable
    );

    if (formData.image) {

      data.append(
        "image",
        formData.image
      );
    }

    await dispatch(
      updateFood({
        id: editFood._id,
        formData: data,
      })
    );

    setEditFood(null);
  };

  if (!editFood) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-[#1b1b1b] rounded-3xl w-full max-w-2xl border border-white/10 overflow-hidden">

        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">

          <h1 className="text-3xl font-bold text-white">

            Update Food

          </h1>

          <button
            onClick={() =>
              setEditFood(null)
            }
            className="w-11 h-11 rounded-xl bg-[#222] hover:bg-red-500 transition flex items-center justify-center text-white"
          >

            <FiX />

          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-5"
        >

          <div className="flex justify-center">

            <label className="cursor-pointer">

              <div className="w-40 h-40 rounded-3xl overflow-hidden border-2 border-dashed border-red-500 bg-[#222] flex items-center justify-center">

                {
                  preview ? (

                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="text-center">

                      <h1 className="text-white text-lg font-semibold">

                        Upload

                      </h1>

                      <p className="text-gray-400 text-sm mt-2">

                        Food Image

                      </p>

                    </div>

                  )
                }

              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />

            </label>

          </div>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="zomatoInput"
            placeholder="Food Title"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="zomatoInput"
            placeholder="Food Price"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="zomatoInput"
          >

            <option value="Starter">
              Starter
            </option>

            <option value="Main Course">
              Main Course
            </option>

            <option value="Dessert">
              Dessert
            </option>

            <option value="Beverages">
              Beverages
            </option>

            <option value="Snacks">
              Snacks
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          <textarea
            rows="4"
            name="description"
            value={
              formData.description
            }
            onChange={handleChange}
            className="zomatoInput resize-none"
            placeholder="Food Description"
          ></textarea>

          <select
            name="isAvailable"
            value={
              formData.isAvailable
                ? "true"
                : "false"
            }
            onChange={(e) =>
              setFormData({
                ...formData,

                isAvailable:
                  e.target.value ===
                  "true",
              })
            }
            className="zomatoInput"
          >

            <option value="true">
              Available
            </option>

            <option value="false">
              Unavailable
            </option>

          </select>

          <button
            type="submit"
            className="primaryBtn"
          >

            Update Food

          </button>

        </form>

      </div>

    </div>
  );
}