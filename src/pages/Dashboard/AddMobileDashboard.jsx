/* eslint-disable react/prop-types */
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../components/shared/Logo";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddMobileDashboard = ({ loadMobiles }) => {
  const [loadingAPI, setLoadingAPI] = useState(false);

  const handleAddNewMobile = async (e) => {
    e.preventDefault();

    // Extract form data
    const form = e.target;
    const model = form.model.value.trim();
    const subtitle = form.subtitle.value.trim();
    const color = form.color.value.trim();
    const ram = form.ram.value.trim();
    const rom = form.rom.value.trim();
    const price = form.price.value.trim();
    const imageUrl = form["image link url"].value.trim();
    const feature1 = form.feature1.value.trim();
    const feature2 = form.feature2.value.trim();
    const feature3 = form.feature3.value.trim();

    // Validation
    const urlRegex = /^(https?:\/\/(?:www\.)?[^\s/$.?#].[^\s]*)$/i;

    if (
      !model ||
      !subtitle ||
      !color ||
      !ram ||
      !rom ||
      !price ||
      !imageUrl ||
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
      ram,
      rom,
      price,
      imageUrl,
      features: {
        feature1,
        feature2,
        feature3,
      },
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
      const response = await axios.post("http://localhost:3000/mobiles", data);
      if (response.data?.id) {
        loadMobiles();
        toast.success("New mobile added successfully");
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
      <div className="flex justify-end mb-4 pt-4">
        <button
          className="btn btn-sm btn-neutral"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Add Mobile
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
                <span className="label-text">Model Name (Mobile)</span>
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
                <span className="label-text">RAM</span>
              </label>
              <input
                type="text"
                placeholder="RAM"
                name="ram"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">ROM</span>
              </label>
              <input
                type="text"
                placeholder="ROM"
                name="rom"
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

export default AddMobileDashboard;
