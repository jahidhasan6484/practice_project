import toast, { Toaster } from "react-hot-toast";
import Card from "../../components/product/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import AddHomeAppliancesDashboard from "./AddHomeAppliancesDashboard";

const HomeAppliancesDashboard = () => {
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
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this home appliance?"
    );

    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/home-appliances/${_id}`
        );
        if (response?.data) {
          loadHomeAppliances();
          toast.success("Home appliance deleted successfully");
        }
      } catch (error) {
        toast.error("Error deleting item");
      }
    } else {
      toast.info("Deletion cancelled");
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <AddHomeAppliancesDashboard loadHomeAppliances={loadHomeAppliances} />
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

export default HomeAppliancesDashboard;
