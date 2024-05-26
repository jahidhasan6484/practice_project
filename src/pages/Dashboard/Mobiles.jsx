import { useEffect, useState } from "react";
import Card from "../../components/product/Card";
import AddMobile from "./AddMobile";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Mobiles = () => {
  const [mobiles, setMobiles] = useState([]);

  const loadMobiles = () => {
    fetch("http://localhost:3000/mobiles")
      .then((response) => response.json())
      .then((data) => setMobiles(data));
  };

  useEffect(() => {
    loadMobiles();
  }, []);

  const handleDeleteMobile = async (_id) => {
    await axios
      .delete(`http://localhost:3000/mobiles/${_id}`)
      .then((data) => {
        if (data?.data) {
          loadMobiles();
          toast.success("Mobile deleted successfully");
        }
      })
      .catch(() => toast.error("Error deleting item"));
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <AddMobile loadMobiles={loadMobiles} />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {mobiles.map((mobile, index) => {
          return (
            <Card key={index} data={mobile} deleteItem={handleDeleteMobile} />
          );
        })}
      </div>
    </div>
  );
};

export default Mobiles;
