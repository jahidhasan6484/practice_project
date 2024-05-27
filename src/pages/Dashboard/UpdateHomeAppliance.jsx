import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Logo from "../../components/shared/Logo";
import axios from "axios";

const UpdateHomeAppliance = () => {
  const { id } = useParams();
  const [homeApplianceDetails, setHomeApplianceDetails] = useState({});
  const [loadingAPI, setLoadingAPI] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/home-appliances/${id}`)
      .then((response) => response.json())
      .then((data) => setHomeApplianceDetails(data));

    document.getElementById("update_home_appliance").showModal();
  }, [id]);

  const handleUpdateHomeAppliance = async (e) => {
    e.preventDefault();

    // Extract form data
    const form = e.target;
    const model = form.model.value.trim();
    const price = form.price.value.trim();
    const imageUrl = form["image link url"].value.trim();

    // Validation
    const urlRegex = /^(https?:\/\/(?:www\.)?[^\s/$.?#].[^\s]*)$/i;

    if (!model || !price || !imageUrl) {
      toast.error("All fields are required!");
      return;
    }

    if (isNaN(price)) {
      toast.error("Price must be a number!");
      return;
    }

    if (!urlRegex.test(imageUrl)) {
      toast.error("Image URL must be a valid link!");
      return;
    }

    const data = {
      model,
      price,
      imageUrl,
    };

    // Confirm with the user before proceeding
    const isConfirmed = window.confirm(
      "Are you sure you want to update this new mobile?"
    );

    if (!isConfirmed) {
      toast.info("Updating cancelled");
      return;
    }

    try {
      setLoadingAPI(true);
      const response = await axios.patch(
        `http://localhost:3000/home-appliances/${id}`,
        data
      );
      if (response.data?.id) {
        toast.success("Home appliance updated successfully");
      }
    } catch (error) {
      toast.error("There was an error updating the home appliance!");
    } finally {
      setLoadingAPI(false);
    }
  };

  return (
    <dialog id="update_home_appliance" className="modal">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <Link to="/">
          <Logo />
        </Link>

        <form onSubmit={handleUpdateHomeAppliance} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">model name (home appliance)</span>
            </label>
            <input
              type="text"
              placeholder="model"
              name="model"
              defaultValue={homeApplianceDetails?.model}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">price (bdt)</span>
            </label>
            <input
              type="number"
              placeholder="price"
              name="price"
              defaultValue={homeApplianceDetails?.price}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">image (link only)</span>
            </label>
            <input
              type="text"
              placeholder="imageURL"
              name="image link url"
              defaultValue={homeApplianceDetails?.imageURL}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value={`${loadingAPI ? "UPDATING..." : "UPDATE"}`}
              className="btn btn-neutral"
              disabled={loadingAPI}
            />
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateHomeAppliance;
