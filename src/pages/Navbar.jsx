import { Link } from "react-router-dom";

const Navbar = () => {
  const navList = [
    {
      name: "AI",
      route: "/ai",
    },
    {
      name: "Mobile",
      route: "/mobile",
    },
    {
      name: "Home Appliances",
      route: "/home-appliances",
    },
    {
      name: "Computing",
      route: "/computing",
    },
  ];

  // const [user] = useAuthState(auth);

  // console.log("user", user);
  // const [signOut] = useSignOut(auth);

  // const handleLogout = async () => {
  //   await signOut();
  // };
  return (
    <div className="navbar bg-base-100">
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
          </ul>
        </div>
        <a className="text-xl uppercase -tracking-wider font-bold">samsung</a>
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
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
