import DashboardLayout from "../layouts/DashboardLayout";

export default function ChangePassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Coming Soon");
  };

  return (
    <DashboardLayout
      title="Change Password"
      subtitle="Update your account password"
    >
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
    </DashboardLayout>
  );
}