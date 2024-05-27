import { useSignOut } from "react-firebase-hooks/auth";
import toast, { Toaster } from "react-hot-toast";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";

const DashboardLayout = () => {
  const [signOut] = useSignOut(auth);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const success = await signOut();

    if (success) {
      toast.success("You are signed out");
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="drawer drawer-mobile lg:drawer-open">
      <Toaster position="top-center" reverseOrder={false} />
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <label
          htmlFor="my-drawer-2"
          className="drawer-button lg:hidden bg-gray-100 pl-4 pt-4 uppercase text-sm font-bold -tracking-widest"
        >
          menu
        </label>
        <main>
          <Outlet />
        </main>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu w-40 bg-white text-base-content h-screen flex justify-between py-12">
          <div>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"me"}>Profile</Link>
            </li>
            <li>
              <Link to={"mobiles"}>Mobiles</Link>
            </li>
            <li>
              <Link to={"home-appliances"}>Home Appliances</Link>
            </li>
          </div>
          <div>
            <li>
              <button
                onClick={handleLogOut}
                className="btn btn-error btn-sm text-white"
              >
                Logout
              </button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
