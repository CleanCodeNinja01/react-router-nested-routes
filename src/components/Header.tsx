import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          React Router App
        </Link>
        <span className="flex-1"></span>
        <ul className="flex gap-4 items-center">
          <li>
            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? "btn btn-outline btn-sm active"
                  : "btn btn-ghost btn-sm";
              }}
              to="/contacts"
            >
              Contacts
            </NavLink>
            {/* <Link className="btn btn-ghost btn-sm" to='/contacts'>Contacts</Link> */}
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return isActive
                  ? "btn btn-outline btn-sm active"
                  : "btn btn-ghost btn-sm";
              }}
              to="/about"
            >
              About
            </NavLink>
            {/* <Link className="btn btn-ghost btn-sm" to='/about'>About</Link> */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
