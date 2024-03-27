import { FaCar, FaUsers, FaMapMarkerAlt } from "react-icons/fa";
import map from '../../assets/map.png'

const Information = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white text-black p-8 rounded-md my-4 mx-4 min-h-[500px]">
      <h2 className="font-bold text-2xl mb-8 text-center">About DriveGather</h2>
      <img src={map} alt="Drive Gather Meet" className="border-2 border-black mb-8 w-full max-w-[1000px] h-auto rounded-md" />
      <div className="flex flex-wrap justify-center gap-4">
        <div className="text-white bg-gray-800 border-2 border-black p-4 rounded-md shadow flex-1 max-w-md min-w-lg">
          <h3 className="font-bold text-xl mb-2 flex items-center">
            <FaCar className="mr-2" />
            Car Enthusiasts
          </h3>
          <hr className="mb-2" />
          <p className="text-md">
            DriveGather is a platform dedicated to bringing car enthusiasts
            together. Discover local car meets, events, and communities where
            you can share your passion for cars with like-minded individuals.
          </p>
        </div>
        <div className="text-white bg-gray-800 border-2 border-black p-4 rounded-md shadow flex-1 max-w-md min-w-lg">
          <h3 className="font-bold text-xl mb-2 flex items-center">
            <FaUsers className="mr-2" />
            Connection
          </h3>
          <hr className="mb-2" />
          <p className="text-md">
            Join communities to connect with other car enthusiasts, discuss your
            favorite cars, and plan meet-ups. DriveGather is all about creating
            a vibrant community for car lovers.
          </p>
        </div>
        <div className="text-white bg-gray-800 border-2 border-black p-4 rounded-md shadow flex-1 max-w-md min-w-lg">
          <h3 className="font-bold text-xl mb-2 flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            Discover Events
          </h3>
          <hr className="mb-2" />
          <p className="text-md">
            Explore events and car meets near you. Whether you&apos;re into
            classic cars, sports cars, or just want to check out some cool
            rides, DriveGather has something for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Information;
