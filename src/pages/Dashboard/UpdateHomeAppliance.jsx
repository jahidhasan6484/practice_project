import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../../components/shared/Logo";
import axios from "axios";

const UpdateHomeAppliance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const goBack = () => {
    navigate("/dashboard/home-appliances");
  };

  return (
    <dialog id="update_home_appliance" className="modal">
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

        <form onSubmit={handleUpdateHomeAppliance} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Model Name (home appliance)</span>
            </label>
            <input
              type="text"
              placeholder="Model"
              name="model"
              defaultValue={homeApplianceDetails.model}
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
              defaultValue={homeApplianceDetails.subtitle}
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
              defaultValue={homeApplianceDetails.color}
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
              defaultValue={homeApplianceDetails.type}
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
              defaultValue={homeApplianceDetails?.features?.feature1}
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
              defaultValue={homeApplianceDetails?.features?.feature2}
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
              defaultValue={homeApplianceDetails?.features?.feature3}
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
              defaultValue={homeApplianceDetails.price}
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
              defaultValue={homeApplianceDetails.imageUrl}
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
