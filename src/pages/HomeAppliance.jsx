import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import CardForUser from "../components/product/CardForUser";

const HomeAppliance = () => {
  const [homeAppliance, setHomeAppliance] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/home-appliances")
      .then((response) => response.json())
      .then((data) => setHomeAppliance(data));
  });
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-300 to-gray-50">
      <SectionTitle _text="Home Appliances" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-6 md:p-12 lg:px-48">
        {homeAppliance.map((ha, index) => {
          return <CardForUser key={index} data={ha} />;
        })}
      </div>
    </div>
  );
};

export default HomeAppliance;
