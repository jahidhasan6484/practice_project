import toast, { Toaster } from "react-hot-toast";
import Card from "../../components/product/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import AddHomeAppliances from "./AddHomeAppliances";

const HomeAppliances = () => {
  const [homeAppliances, setHomeAppliances] = useState([]);

  const loadHomeAppliances = () => {
    fetch("http://localhost:3000/home-appliances")
      .then((response) => response.json())
      .then((data) => setHomeAppliances(data));
  };

  useEffect(() => {
    loadHomeAppliances();
  }, []);

  const handleDeleteHomeAppliance = async (_id) => {
    await axios
      .delete(`http://localhost:3000/home-appliances/${_id}`)
      .then((data) => {
        if (data?.data) {
          loadHomeAppliances();
          toast.success("Home appliance deleted successfully");
        }
      })
      .catch(() => toast.error("Error deleting item"));
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <AddHomeAppliances loadHomeAppliances={loadHomeAppliances} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {homeAppliances?.map((ha, index) => {
          return (
            <Card
              key={index}
              data={ha}
              deleteItem={handleDeleteHomeAppliance}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomeAppliances;
