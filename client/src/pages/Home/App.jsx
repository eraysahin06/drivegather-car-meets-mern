import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useAuth();

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        user={user}
      />

      {/* Main content */}
      <div className="flex-1 p-5">
        <div className="flex items-center mb-5">
          <Link
            to="/add-vehicle"
            className="p-4 bg-gray-800 hover:bg-gray-700 rounded-md"
          >
            <FaPlus size={24} />
          </Link>
          <h2 className="text-xl font-semibold ml-2">Vehicles</h2>
        </div>
        <p className="mb-5">Your vehicles will be displayed here.</p>

        <div className="flex items-center mb-5">
          <h2 className="text-xl font-semibold">
            Explore Car Meets in Your Area
          </h2>
        </div>
        <p>Your local car meets will be displayed here.</p>
      </div>
    </div>
  );
}

export default App;