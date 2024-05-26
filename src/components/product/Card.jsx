/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

// eslint-disable-next-line react/prop-types
const Card = ({ data, deleteItem }) => {
  const { id, model, imageURL, releaseYear } = data;

  return (
    <div className="card bg-base-100 shadow-md border py-4">
      <figure>
        <img src={imageURL} alt={model} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {model}
          {releaseYear && (
            <div className="badge badge-secondary">{releaseYear}</div>
          )}
        </h2>
        <div className="card-actions justify-end pt-8 flex flex-wrap">
          <Link to="update" className="btn btn-outline btn-info">
            <MdModeEdit />
          </Link>
          <button
            onClick={() => deleteItem(id)}
            className="btn btn-error text-white"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
