/* eslint-disable react/prop-types */
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../components/shared/Logo";
import axios from "axios";
import { useState } from "react";

// eslint-disable-next-line no-unused-vars
const AddMobile = ({ loadMobiles }) => {
  const [loadingAPI, setLoadingAPI] = useState(false);
  const handleAddNewMobile = async (e) => {
    e.preventDefault();

    // Extract form data
    const form = e.target;
    const model = form.model.value.trim();
    const price = form.price.value.trim();
    const subTitle = form["sub title"].value.trim();
    const releaseYear = form["release year"].value.trim();
    const imageUrl = form["image link url"].value.trim();

    // Validation
    const urlRegex = /^(https?:\/\/(?:www\.)?[^\s/$.?#].[^\s]*)$/i;

    if (!model || !price || !subTitle || !releaseYear || !imageUrl) {
      toast.error("All fields are required!");
      return;
    }

    if (isNaN(price)) {
      toast.error("Price must be a number!");
      return;
    }

    if (!Number.isInteger(Number(releaseYear)) || releaseYear.length !== 4) {
      toast.error("Release year must be a valid 4-digit year!");
      return;
    }

    if (!urlRegex.test(imageUrl)) {
      toast.error("Image URL must be a valid link!");
      return;
    }

    const data = {
      model,
      price,
      subTitle,
      releaseYear,
      imageUrl,
    };

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
      <div className="flex justify-end mb-4">
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          add mobile
        </button>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <Logo />

          <form onSubmit={handleAddNewMobile} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">model name (mobile)</span>
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
                <span className="label-text">sub title</span>
              </label>
              <input
                type="text"
                placeholder="sub-title"
                name="sub title"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">release year</span>
              </label>
              <input
                type="number"
                placeholder="release-year"
                name="release year"
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

export default AddMobile;
