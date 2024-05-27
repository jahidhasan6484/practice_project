import { useEffect, useState } from "react";
import Card from "../../components/product/Card";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import AddMobileDashboard from "./AddMobileDashboard";

const MobilesDashboard = () => {
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
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this mobile?"
    );

    if (!isConfirmed) {
      toast.info("Deletion cancelled");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/mobiles/${_id}`
      );
      if (response?.data) {
        loadMobiles();
        toast.success("Mobile deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting item");
    }
  };

  return (
    <div className="px-12 bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <AddMobileDashboard loadMobiles={loadMobiles} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-6">
        {mobiles?.map((mobile, index) => {
          return (
            <Card key={index} data={mobile} deleteItem={handleDeleteMobile} />
          );
        })}
      </div>
    </div>
  );
};

export default MobilesDashboard;
