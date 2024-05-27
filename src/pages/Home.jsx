import Hero from "../components/Hero";
import AI from "./AI";
import Mobile from "./Mobile";
import HomeAppliance from "./HomeAppliance";

const Home = () => {
  return (
    <>
      <div className="relative h-screen flex items-center">
        <Hero src="./banner.webm" type="video/webm" />
        <div className="absolute inset-0 flex flex-col justify-center items-start text-white px-12 md:px-24">
          <h1 className="text-2xl md:text-6xl font-bold mb-4 text-black">
            Galaxy S24 Ultra
          </h1>
        </div>
      </div>
      <AI />
      <Mobile />
      <HomeAppliance />
    </>
  );
};

export default Home;
