import { useAuth } from '../../hooks/useAuth';
import { FaPlus } from 'react-icons/fa'; // For the [+] icon

function App() {
  const user = useAuth();

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-5">
        {user && (
          <div className="text-center mb-5">
            <img className="w-20 h-20 rounded-full mx-auto" src={user.photoURL || 'https://via.placeholder.com/150'} alt="Profile" />
            <p className="text-lg font-semibold mt-2">{user.displayName || 'User'}</p>
          </div>
        )}
        <ul>
          <li className="my-2 hover:bg-gray-700 p-2 rounded-md"><a href="#">Add/Modify Vehicle</a></li>
          <li className="my-2 hover:bg-gray-700 p-2 rounded-md"><a href="#">Explore Car Meets</a></li>
          <li className="my-2 hover:bg-gray-700 p-2 rounded-md"><a href="#">Explore Communities</a></li>
          <li className="my-2 hover:bg-gray-700 p-2 rounded-md"><a href="#">Create a Car Meet</a></li>
          <li className="my-2 hover:bg-gray-700 p-2 rounded-md"><a href="#">Settings</a></li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-5">
        <div className="flex items-center mb-5">
          <FaPlus className="mr-2" />
          <h2 className="text-xl font-semibold">Vehicles</h2>
        </div>
        <p className="mb-5">Your vehicles will be displayed here.</p>

        <div className="flex items-center mb-5">
          <FaPlus className="mr-2" />
          <h2 className="text-xl font-semibold">Explore Car Meets in Your Area</h2>
        </div>
        <p>Your local car meets will be displayed here.</p>
      </div>
    </div>
  );
}

export default App;
