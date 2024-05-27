import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "../../components/shared/Logo";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UpdateMobile = () => {
  const { id } = useParams();
  const [mobileDetails, setMobileDetails] = useState({});
  const [loadingAPI, setLoadingAPI] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/mobiles/${id}`)
      .then((response) => response.json())
      .then((data) => setMobileDetails(data));

    document.getElementById("update_mobile").showModal();
  }, [id]);

  const handleUpdateMobile = async (e) => {
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
        `http://localhost:3000/mobiles/${id}`,
        data
      );
      if (response.data?.id) {
        toast.success("Mobile updated successfully");
      }
    } catch (error) {
      toast.error("There was an error updating the mobile!");
    } finally {
      setLoadingAPI(false);
    }
  };
  return (
    <dialog id="update_mobile" className="modal">
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

        <form onSubmit={handleUpdateMobile} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">model name (mobile)</span>
            </label>
            <input
              type="text"
              placeholder="model"
              name="model"
              defaultValue={mobileDetails?.model}
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
              defaultValue={mobileDetails?.price}
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
              defaultValue={mobileDetails?.imageURL}
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

export default UpdateMobile;
