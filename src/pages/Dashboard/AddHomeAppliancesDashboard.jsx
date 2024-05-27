/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../components/shared/Logo";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AddHomeAppliancesDashboard = ({ loadHomeAppliances }) => {
  const [loadingAPI, setLoadingAPI] = useState(false);

  const handleAddNewHomeAppliance = async (e) => {
    e.preventDefault();

    // Extract form data
    const form = e.target;
    const model = form.model.value.trim();
    const subtitle = form.subtitle.value.trim();
    const color = form.color.value.trim();
    const type = form.type.value.trim();
    const feature1 = form.feature1.value.trim();
    const feature2 = form.feature2.value.trim();
    const feature3 = form.feature3.value.trim();
    const price = form.price.value.trim();
    const imageUrl = form["image link url"].value.trim();

    // Validation
    const urlRegex = /^(https?:\/\/(?:www\.)?[^\s/$.?#].[^\s]*)$/i;

    if (
      !model ||
      !price ||
      !imageUrl ||
      !subtitle ||
      !color ||
      !type ||
      !feature1 ||
      !feature2 ||
      !feature3
    ) {
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
      subtitle,
      color,
      type,
      features: { feature1, feature2, feature3 },
      price,
      imageUrl,
    };

    // Confirm with the user before proceeding
    const isConfirmed = window.confirm(
      "Are you sure you want to add this new home appliance?"
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

          <form onSubmit={handleAddNewHomeAppliance} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Model Name (home appliance)</span>
              </label>
              <input
                type="text"
                placeholder="Model"
                name="model"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Subtitle</span>
              </label>
              <input
                type="text"
                placeholder="Subtitle"
                name="subtitle"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Color</span>
              </label>
              <input
                type="text"
                placeholder="Color"
                name="color"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Prouct type</span>
              </label>
              <input
                type="text"
                placeholder="type"
                name="type"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Feature 1</span>
              </label>
              <input
                type="text"
                placeholder="Feature 1"
                name="feature1"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Feature 2</span>
              </label>
              <input
                type="text"
                placeholder="Feature 2"
                name="feature2"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Feature 3</span>
              </label>
              <input
                type="text"
                placeholder="Feature 3"
                name="feature3"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price (BDT)</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                name="price"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image (Link Only)</span>
              </label>
              <input
                type="text"
                placeholder="Image URL"
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
