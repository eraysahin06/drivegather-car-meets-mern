import Communities from "../../components/Communities/Communities";
import MEET from "../../assets/meet.jpg";

const AllCommunities = () => {
  return (
    <>
      <div className="relative">
        <img
          src={MEET}
          alt="communities"
          className="w-full h-96 object-cover"
          style={{ height: "75vh", filter: "brightness(50%)" }}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Communities</h1>
            <p className="text-xl">Find the perfect community for you</p>
          </div>
        </div>
      </div>
      <Communities />
    </>
  );
};

export default AllCommunities;
