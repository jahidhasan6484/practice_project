/* eslint-disable react/prop-types */
const Hero = ({ src, type }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="object-cover object-center w-full h-full"
      >
        <source src={src} type={type} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Hero;
