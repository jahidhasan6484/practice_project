/* eslint-disable react/prop-types */

const CardForMobileUser = ({ data }) => {
  const { model, imageUrl, color, ram, rom, features } = data;
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
            <li>{features?.feature1}</li>
            <li>{features?.feature2}</li>
            <li>{features?.feature3}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardForMobileUser;
