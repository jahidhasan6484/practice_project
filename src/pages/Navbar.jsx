import { Link } from "react-router-dom";
import Logo from "../components/shared/Logo";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/shared/Loading";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  console.log("USER IN NAV", user);
  if (loading) {
    return <Loading />;
  }

  const navList = [
    {
      name: "Mobile",
      route: "/mobile",
    },
    {
      name: "Home Appliances",
      route: "/home-appliance",
    },
  ];

  const handleLogOut = async () => {
    const success = await signOut();

    if (success) {
      toast.success("You are sign out");
    }
  };
  return (
    <div className="navbar bg-base-100">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navList.map((list, index) => {
              return (
                <li key={index}>
                  <Link to={list.route}>{list.name}</Link>
                </li>
              );
            })}
            {user?.email && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navList.map((list, index) => {
            return (
              <li key={index}>
                <Link to={list.route}>{list.name}</Link>
              </li>
            );
          })}

          {user?.email && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {user?.email ? (
          <button
            onClick={handleLogOut}
            className="btn btn-error btn-sm text-white"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-ghost btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
