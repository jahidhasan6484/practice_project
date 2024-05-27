import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HomeApplianceDetails = () => {
  const { id } = useParams();
  const [homeApplianceDetails, setHomeApplianceDetails] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/home-appliances/${id}`)
      .then((response) => response.json())
      .then((data) => setHomeApplianceDetails(data));
  }, [id]);

  return (
    <div className="h-screen flex flex-col md:flex-row justify-evenly items-center p-4 bg-gradient-to-b from-gray-50 to-gray-300">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src={homeApplianceDetails.imageUrl}
          alt={homeApplianceDetails.model}
          className="max-w-full h-auto object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 mt-8 md:mt-0 -tracking-wider">
        <p className="text-2xl font-bold">{homeApplianceDetails.model}</p>
        <p className="mb-8">{homeApplianceDetails.subtitle}</p>
        <p>
          <span className="font-semibold">Type: </span>
          {homeApplianceDetails.productType}
        </p>
        <p>
          <span className="font-semibold">Color: </span>{" "}
          {homeApplianceDetails.color}
        </p>
        <p>
          <span className="font-semibold">Price: </span>{" "}
          {homeApplianceDetails.price}
        </p>
        <ul className="mt-4 list-disc pl-5">
          <li>{homeApplianceDetails.features?.feature1}</li>
          <li>{homeApplianceDetails.features?.feature2}</li>
          <li>{homeApplianceDetails.features?.feature3}</li>
        </ul>
      </div>
    </div>
  );
};

export default HomeApplianceDetails;
