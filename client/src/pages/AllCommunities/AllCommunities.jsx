import Communities from "../../components/Communities/Communities";
import MEET from '../../assets/meet.jpg';

const AllCommunities = () => {
  return (
    <>
      <div className="relative">
        <img src={MEET} alt="communities" className="w-full h-96 object-cover"  style={{ height: '75vh', filter: 'brightness(50%)' }} />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h2 className="text-white text-5xl font-bold">Communities</h2>
        </div>
      </div>
      <Communities />
    </>
  );
};

export default AllCommunities;
