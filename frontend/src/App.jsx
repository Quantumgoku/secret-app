// import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { PostSecretCard, SecretCard } from "./SecretCard";

import { AuthContext } from "./AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;
function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [secrets, setSecrets] = useState([]);
  const [userSecret, setUserSecret] = useState({});

  const getSecrets = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/secrets/all`)
      .then(({ data: { secrets, error } }) => {
        console.log(secrets);
        setSecrets(secrets || []);
        if (error) {
          toast.error(error);
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const getUserSecret = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/secrets/${user.username}`)
      .then(({ data: secret }) => {
        console.log({ secret });
        // if (secret) {
        setUserSecret(secret || null);
        // }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  // const addSecret = (e) => {};

  useEffect(() => {
    getSecrets();
    if (user.username) {
      getUserSecret();
    }
  }, [user]);

  return (
    <>
      {user.username ? (
        <>
          <div className="container mx-auto">
            {/* {userSecret != null ? "Cannot post a secret" : "Post a secret"} */}
            {userSecret?.secret ? (
              <SecretCard
                randomName={`${userSecret.secret.randomName} (You)`}
                message={userSecret.secret.message}
              ></SecretCard>
            ) : (
              <PostSecretCard setUserSecret={setUserSecret}></PostSecretCard>
            )}
            <p>All posts</p>
            <div>
              {secrets.map((secret) => {
                return (
                  <SecretCard key={secret._id}
                    randomName={secret.randomName}
                    message={secret.message}
                  ></SecretCard>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          Please{" "}
          <Link to="/auth/signin" state={{ from: location }}>
            Sign in
          </Link>{" "}
          to continue
        </>
      )}
    </>
  );
}

export default App;
