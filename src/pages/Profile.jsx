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
    <div className="flex flex-col md:flex-row justify-evenly md:h-screen items-center gap-y-12 pt-12 md:pt-0 overflow-y-hidden">
      <div className="text-center">
        {user?.photoURL && !imageError ? (
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img
                src={user.photoURL}
                alt="User Avatar"
                onError={handleImageError}
              />
            </div>
          </div>
        ) : (
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-24">
              <span className="text-3xl uppercase">
                {user?.email.slice(0, 1)}
              </span>
            </div>
          </div>
        )}

        <p className="tracking-widest pt-4">{user?.displayName}</p>
      </div>

      <div className="flex flex-col gap-y-2">
        <p>
          <span className="font-semibold tracking-wider">Email:</span>{" "}
          {user?.email}
        </p>
        <p>
          <span className="font-semibold tracking-wider">Creation Time:</span>{" "}
          {convertToBDT(user?.metadata?.creationTime)}
        </p>
        <p>
          <span className="font-semibold tracking-wider">
            Last Sign-In Time:
          </span>{" "}
          {convertToBDT(user?.metadata?.lastSignInTime)}
        </p>
        <p>
          <span className="font-semibold tracking-wider">Phone Number:</span>{" "}
          {user?.phoneNumber || "Not provided"}
        </p>
      </div>
    </div>
  );
};

export default Profile;
