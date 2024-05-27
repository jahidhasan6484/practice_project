/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../components/shared/Logo";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AddHomeAppliancesDashboard = ({ loadHomeAppliances }) => {
  const [loadingAPI, setLoadingAPI] = useState(false);

  const handleAddNewMobile = async (e) => {
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
      "Are you sure you want to add this new mobile?"
    );

    if (!isConfirmed) {
      toast.info("Addition cancelled");
      return;
    }

    try {
      setLoadingAPI(true);
      const response = await axios.post(
        "http://localhost:3000/home-appliances",
        data
      );
      if (response.data?.id) {
        loadHomeAppliances();
        toast.success("New home appliance added successfully");
        e.target.reset();
      }
    } catch (error) {
      toast.error("There was an error creating the post!");
    } finally {
      setLoadingAPI(false);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-end mb-4">
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          add home appliance
        </button>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <Link to="/">
            <Logo />
          </Link>

          <form onSubmit={handleAddNewMobile} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">model name (home appliance)</span>
              </label>
              <input
                type="text"
                placeholder="model"
                name="model"
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
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                value={`${loadingAPI ? "ADDING..." : "ADD"}`}
                className="btn btn-neutral"
                disabled={loadingAPI}
              />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddHomeAppliancesDashboard;
