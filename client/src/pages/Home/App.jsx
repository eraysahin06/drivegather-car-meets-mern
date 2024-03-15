import { useAuth } from '../../hooks/useAuth';

function App() {
  const user = useAuth();

  return (
    <div className="flex justify-center items-center h-screen">
      {user ? (
        <div className="text-center">
          <p className="text-lg font-semibold">Welcome, {user.displayName || 'User'}!</p>
          {user.photoURL && <img className="w-20 h-20 rounded-full mx-auto" src={user.photoURL} alt="Profile" />}
        </div>
      ) : (
        <div className="text-lg font-semibold">Home</div>
      )}
    </div>
  );
}

export default App;
