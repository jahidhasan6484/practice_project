import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";

const HomeAppliance = () => {
  const [homeAppliance, setHomeAppliance] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/home-appliances")
      .then((response) => response.json())
      .then((data) => setHomeAppliance(data));
  });
  return (
    <div className="min-h-screen">
      <SectionTitle _text="Home Appliance" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 md:p-12 lg:p-16">
        {/* {homeAppliance?.map((ha, index) => {
          return <CardForUser key={index} data={ha} />;
        })} */}
      </div>
    </div>
  );
};

export default HomeAppliance;
