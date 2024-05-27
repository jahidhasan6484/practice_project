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
    <div className="flex">
      <div>
        <img
          src={homeApplianceDetails.imageURL}
          alt={homeApplianceDetails.model}
        />
      </div>
      <div>
        <p>Model: {homeApplianceDetails.model} BDT</p>
        <p>Price: {homeApplianceDetails.price} BDT</p>
      </div>
    </div>
  );
};

export default HomeApplianceDetails;
