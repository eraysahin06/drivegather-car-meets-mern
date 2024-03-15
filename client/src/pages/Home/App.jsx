import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up the subscription when the component unmounts
    return unsubscribe;
  }, []);

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
