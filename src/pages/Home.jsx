import { Link } from "react-router-dom";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div className="relative h-screen flex items-center">
      <Hero src="./banner.webm" type="video/webm" />
      <div className="absolute inset-0 flex flex-col justify-center items-start text-white px-24">
        <h1 className="text-6xl font-bold mb-4 text-black">Galaxy S24 Ultra</h1>
        <Link to="learn-more" className="btn bg-black text-white">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Home;
