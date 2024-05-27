import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../../components/shared/Logo";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UpdateMobile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    const subtitle = form.subtitle.value.trim();
    const color = form.color.value.trim();
    const ram = form.ram.value.trim();
    const rom = form.rom.value.trim();
    const feature1 = form.feature1.value.trim();
    const feature2 = form.feature2.value.trim();
    const feature3 = form.feature3.value.trim();
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
      subtitle,
      color,
      ram,
      rom,
      features: { feature1, feature2, feature3 },
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

  const goBack = () => {
    navigate("/dashboard/mobiles");
  };

  return (
    <dialog id="update_mobile" className="modal">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={goBack}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <Link to="/">
          <Logo />
        </Link>

        <form onSubmit={handleUpdateMobile} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Model Name (Mobile)</span>
            </label>
            <input
              defaultValue={mobileDetails.model}
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
              defaultValue={mobileDetails.subtitle}
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
              defaultValue={mobileDetails.color}
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
              defaultValue={mobileDetails.ram}
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
              defaultValue={mobileDetails.rom}
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
              defaultValue={mobileDetails.features?.feature1}
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
              defaultValue={mobileDetails.features?.feature2}
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
              defaultValue={mobileDetails.features?.feature3}
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
              defaultValue={mobileDetails.price}
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
              defaultValue={mobileDetails.imageUrl}
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
