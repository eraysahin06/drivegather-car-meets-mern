import AboutImg from "../../assets/aboutimg.jpg";

const About = () => {
  return (
    <>
      <div className="relative">
        <img
          src={AboutImg}
          alt="communities"
          className="w-full object-cover"
          style={{ height: "75vh", filter: "brightness(50%)" }}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">About DriveGather</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-center my-8">About DriveGather</h1>
        <p className="text-lg leading-relaxed">
        DriveGather is a platform for car enthusiasts to connect and share their
          passion for cars. Whether you&apos;re a fan of classic cars, sports
          cars, or any other type of vehicle, DriveGather is the place to meet
          like-minded individuals, share your experiences, and learn from
          others.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Our mission is to bring together car lovers from all over the world
          and create a vibrant community where everyone can share their love for
          automobiles. We believe that cars are more than just a mode of
          transportation; they are a way of life.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Join us and be a part of our growing community of car enthusiasts.
          Share your car stories, participate in discussions, and connect with
          others who share your passion. Let&apos;s make DriveGather the ultimate
          destination for all things automotive!
        </p>
      </div>
    </>
  );
};

export default About;
