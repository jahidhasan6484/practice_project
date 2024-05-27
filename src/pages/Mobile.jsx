import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import CardForUser from "../components/product/CardForUser";

const Mobile = () => {
  const [mobiles, setMobiles] = useState([]);

  const loadMobiles = () => {
    fetch("http://localhost:3000/mobiles")
      .then((response) => response.json())
      .then((data) => setMobiles(data));
  };

  useEffect(() => {
    loadMobiles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-300">
      <SectionTitle _text="Mobile" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-6 md:p-12 lg:px-48">
        {mobiles.map((mobile, index) => {
          return <CardForUser key={index} data={mobile} />;
        })}
      </div>
    </div>
  );
};

export default Mobile;
