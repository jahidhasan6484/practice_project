/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

// eslint-disable-next-line react/prop-types
const Card = ({ data, deleteItem }) => {
  const { id, model, imageUrl, color, ram, rom, features } = data;

  return (
    <div className="bg-white rounded-lg h-[430px] py-4 px-8 flex flex-col">
      <figure className="w-full h-40 overflow-hidden mb-6">
        <img
          src={imageUrl}
          alt={model}
          className="object-contain w-full h-full"
        />
      </figure>
      <div className="card-body p-2 flex flex-col">
        <p className="font-semibold tracking-widest">{model}</p>
        <div className="-tracking-wider">
          <p>
            <span className="font-semibold">Color:</span> {color}
          </p>
          <p>
            {ram} / {rom}
          </p>
          <ul className="mt-4 list-disc">
            <li>{features.feature1}</li>
            <li>{features.feature2}</li>
            <li>{features.feature3}</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-row justify-end mt-4 gap-x-2">
        <Link to={`details/${id}`} className="btn btn-outline btn-xs btn-info">
          <TbListDetails />
        </Link>
        <Link to={`update/${id}`} className="btn btn-warning btn-xs text-white">
          <MdModeEdit />
        </Link>
        <button
          onClick={() => deleteItem(id)}
          className="btn btn-error btn-xs text-white"
        >
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default Card;
