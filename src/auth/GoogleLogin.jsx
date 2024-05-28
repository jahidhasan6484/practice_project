import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";

const GoogleLogin = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const handleLoginWithGoogle = () => {
    signInWithGoogle();
  };

  return (
    <div>
      <button
        onClick={handleLoginWithGoogle}
        className="btn bg-yellow-500 text-white px-5 py-3 w-full "
      >
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
