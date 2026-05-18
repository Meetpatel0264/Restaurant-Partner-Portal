import Sidebar from "../components/common/Sidebar";

import Topbar from "../components/common/Topbar";

export default function ChangePassword() {

  const handleSubmit = (e) => {

    e.preventDefault();

    alert("Coming Soon");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">

      <Sidebar />

      <div className="flex-1">

        <Topbar
          title="Change Password"
          subtitle="Update your account password"
        />

        <div className="p-8 flex items-center justify-center">

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl bg-[#1b1b1b] rounded-3xl p-8 border border-white/5"
          >

            <h1 className="text-3xl font-bold text-white mb-8">
              Update Password
            </h1>

            <div className="space-y-5">

              <input
                type="password"
                placeholder="Old Password"
                className="zomatoInput"
              />

              <input
                type="password"
                placeholder="New Password"
                className="zomatoInput"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="zomatoInput"
              />

            </div>

            <button className="primaryBtn mt-6">

              Change Password

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}