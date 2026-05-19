import {
  FiX,
  FiCamera,
} from "react-icons/fi";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  useState,
  useEffect,
} from "react";

import {
  updateProfile,
} from "../../features/authSlice";

export default function EditProfileModal({
  open,
  setOpen,
}) {

  const dispatch = useDispatch();

  const { user } =
    useSelector(
      (state) => state.auth
    );

  const [success, setSuccess] =
    useState(false);

  const [preview, setPreview] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      address: "",
      image: null,
    });

  useEffect(() => {

    if (user) {

      setFormData({
        name:
          user?.name || "",

        phone:
          user?.phone || "",

        address:
          user?.address || "",

        image: null,
      });

      setPreview(
        user?.image || ""
      );
    }

  }, [user]);

  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
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
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    const data =
      new FormData();

    data.append(
      "name",
      formData.name
    );

    data.append(
      "phone",
      formData.phone
    );

    data.append(
      "address",
      formData.address
    );

    if (formData.image) {

      data.append(
        "image",
        formData.image
      );
    }

    await dispatch(
      updateProfile(data)
    );

    setSuccess(true);

    setTimeout(() => {

      setSuccess(false);

      setOpen(false);

    }, 1500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-[#1b1b1b] rounded-3xl w-full max-w-xl border border-white/10 overflow-hidden">

        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">

          <h1 className="text-3xl font-bold text-white">

            Edit Profile

          </h1>

          <button
            onClick={() =>
              setOpen(false)
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

          {
            success && (
              <div className="bg-green-500/20 border border-green-500 text-green-400 px-5 py-4 rounded-2xl">

                Profile Updated Successfully 🎉

              </div>
            )
          }

          <div className="flex justify-center">

            <label className="relative cursor-pointer">

              <img
                src={
                  preview ||
                  "/user.png"
                }
                alt="profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-red-500"
              />

              <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">

                <FiCamera />

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
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="zomatoInput"
            placeholder="Restaurant Name"
          />

          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="zomatoInput opacity-70 cursor-not-allowed"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="zomatoInput"
            placeholder="Phone Number"
          />

          <textarea
            rows="4"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="zomatoInput resize-none"
            placeholder="Restaurant Address"
          ></textarea>

          <button
            type="submit"
            className="primaryBtn"
          >

            Save Changes

          </button>

        </form>

      </div>

    </div>
  );
}