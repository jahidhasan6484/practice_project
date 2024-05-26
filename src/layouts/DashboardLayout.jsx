import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open py-4 px-4">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <label
        htmlFor="my-drawer-2"
        className="drawer-button lg:hidden uppercase -tracking-widest font-bold text-sm"
      >
        menu
      </label>

      <div className="drawer-content flex flex-col p-8">
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"mobiles"}>Mobiles</Link>
          </li>
          <li>
            <Link to={"home-appliances"}>Home Appliances</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
