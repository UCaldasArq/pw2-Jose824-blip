import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Screen Time Tracker</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/users" className="hover:text-blue-200">Users</Link>
          <Link to="/usage" className="hover:text-blue-200">Usage</Link>
          <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
