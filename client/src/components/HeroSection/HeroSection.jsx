import carMeetImage from '../../assets/carmeetimg.jpg'

const HeroSection = () => {
  return (
    <div className="relative">
      <img src={carMeetImage} alt="Car Meet" className="w-full object-cover" style={{ height: '75vh', filter: 'brightness(50%)' }} />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Join the Excitement</h1>
          <p className="text-xl">Discover local car meets and show off your ride</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
