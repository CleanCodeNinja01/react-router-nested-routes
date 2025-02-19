import { Link, NavLink, Outlet } from "react-router-dom";

const About = () => {
  return (
    <main>
      <div className="flex flex-col md:flex-row gap-4">
        <ul className="menu gap-2 bg-base-200 w-full md:w-56 rounded-box w-56">
          <li>
            {/* <Link to="/about/info">Info</Link> */}
            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? "bg-primary focus:bg-primary active:bg-primary"
                  : "";
              }}
              to="/about/info"
            >
              Info
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? "bg-primary focus:bg-primary active:bg-primary"
                  : "";
              }}
              to="/about/settings"
            >
              Settings
            </NavLink>{" "}
          </li>
        </ul>
        <section>
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default About;
