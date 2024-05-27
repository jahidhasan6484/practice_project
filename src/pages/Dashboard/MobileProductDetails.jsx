import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MobileProductDetails = () => {
  const { id } = useParams();
  const [mobileDetails, setMobileDetails] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/mobiles/${id}`)
      .then((response) => response.json())
      .then((data) => setMobileDetails(data));
  }, [id]);

  return (
    <div className="h-screen flex flex-col md:flex-row justify-evenly items-center p-4 bg-gradient-to-b from-gray-50 to-gray-300">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src={mobileDetails.imageUrl}
          alt={mobileDetails.model}
          className="max-w-full h-auto object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 mt-8 md:mt-0 -tracking-wider">
        <p className="text-2xl font-bold">{mobileDetails.model}</p>
        <p className="mb-8">{mobileDetails.subtitle}</p>
        <p>
          <span className="font-semibold">RAM: </span>
          {mobileDetails.ram}
        </p>
        <p>
          <span className="font-semibold">ROM: </span> {mobileDetails.rom}
        </p>
        <p>
          <span className="font-semibold">Color: </span> {mobileDetails.color}
        </p>
        <p>
          <span className="font-semibold">Price: </span> {mobileDetails.price}
        </p>
        <ul className="mt-4 list-disc pl-5">
          <li>{mobileDetails.features?.feature1}</li>
          <li>{mobileDetails.features?.feature2}</li>
          <li>{mobileDetails.features?.feature3}</li>
        </ul>
      </div>
    </div>
  );
};

export default MobileProductDetails;
