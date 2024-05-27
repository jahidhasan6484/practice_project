import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import Loading from "../components/shared/Loading";
import { useState, useEffect } from "react";

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Reset image error when user changes
    setImageError(false);
  }, [user]);

  const convertToBDT = (gmtTime) => {
    if (!gmtTime) return "Not available";
    const date = new Date(gmtTime);
    const bdOffset = 6 * 60; // BDT is GMT+6, so 6 hours * 60 minutes
    const bdtTime = new Date(date.getTime() + bdOffset * 60 * 1000);
    return bdtTime.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return <Loading />;
  }

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="h-screen flex flex-col gap-y-12 md:flex-row md:justify-evenly items-center p-4 bg-gradient-to-b from-gray-50 to-gray-300">
      <div className="w-full md:w-1/2 flex justify-center items-center text-center md:text-left">
        {user?.photoURL && !imageError ? (
          <div className="avatar">
            <div className="w-32 rounded-full">
              <img
                src={user.photoURL}
                alt="User Avatar"
                onError={handleImageError}
              />
            </div>
          </div>
        ) : (
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-32">
              <span className="text-3xl uppercase">
                {user?.email.slice(0, 1)}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left -tracking-wider">
        <p className="text-2xl font-bold mb-8">{user?.displayName}</p>
        <p>
          <span className="font-semibold">Email: </span>
          {user?.email}
        </p>
        <p>
          <span className="font-semibold">Creation time: </span>{" "}
          {convertToBDT(user?.metadata?.creationTime)}
        </p>
        <p>
          <span className="font-semibold">Last sign-in time: </span>{" "}
          {convertToBDT(user?.metadata?.lastSignInTime)}
        </p>
        <p>
          <span className="font-semibold">Phone number: </span>{" "}
          {user?.phoneNumber || "Not provided"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
