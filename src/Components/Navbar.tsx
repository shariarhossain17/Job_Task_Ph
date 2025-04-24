import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="bg-blue-800 py-4 font-bold px-16 md:flex items-center justify-between">
      <div className="text-white text-2xl">Programming Hero</div>
      <div>
        <Link className="text-white mx-4" to="/">
          Work Tracker
        </Link>
        <Link className="text-white mx-4" to="/cv-maker">
          Cv Maker
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
