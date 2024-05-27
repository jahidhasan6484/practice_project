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
    <div className="flex">
      <div>
        <img src={mobileDetails.imageURL} alt={mobileDetails.model} />
      </div>
      <div>
        <p>Model: {mobileDetails.model} BDT</p>
        <p>Price: {mobileDetails.price} BDT</p>
      </div>
    </div>
  );
};

export default MobileProductDetails;
