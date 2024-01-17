import { useEffect, useState, useContext } from "react";
import { Tabs, Tab, Input, Button } from "@nextui-org/react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
axios.defaults.withCredentials = true;
import { AuthContext } from "./AuthContext";
function AuthPage() {
  const { user, signIn, signUp, signOut } = useContext(AuthContext);

  const params = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState();
  const location = useLocation();
  const from = location?.state?.from?.pathname;
  const handleSignup = (e) => {
    e.preventDefault();
    const rawFormData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );

    toast.promise(signUp(rawFormData), {
      pending: "Signing up. . .",
      success: {
        render: () => {
          navigate("../signin", { relative: "path" });
          return "Signup successful";
        },
      },
      error: {
        render({ data }) {
          return data;
        },
      },
    });
  };

  const handleSignin = (e) => {
    e.preventDefault();
    const rawFormData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );

    toast.promise(signIn(rawFormData), {
      pending: "Signing in . . .",
      success: {
        render: () => {
          // console.log({ from });
          navigate(from, { replace: true });
          return "Signin successful";
        },
      },
      error: {
        render({ data }) {
          console.log({ data });
          return data?.message || data;
        },
      },
    });
  };

  const handleSignOut = () => {
    toast.promise(signOut, {
      pending: "Signing out  . . .",
      success: {
        render: () => {
          setTimeout(() => {
            navigate(0);
          }, 2000);
          return "Signout successful";
        },
        error: {
          render: ({ data }) => {
            console.log({ data });
            return data?.message || data;
          },
        },
      },
    });
  };

  useEffect(() => {
    if (!["signin", "signup"].includes(params?.action)) {
      navigate("/");
    }
    setTab(params?.action);
  }, [params, navigate]);

  return (
    <>
      {user.username ? (
        <>
          Signed in as {user.username}
          {/* Cannot access this page while signed in */}
          <Button onClick={handleSignOut}>Sign out</Button>
        </>
      ) : (
        <>
          <Tabs selectedKey={tab} onSelectionChange={setTab}>
            <Tab
              key={"signin"}
              title={"Sign In"}
              as={Link}
              to="../signin"
              replace
              relative="path"
            >
              <form action="" method="post" onSubmit={handleSignin}>
                <Input label="Username" name="username" isRequired />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  isRequired
                />
                <Button type="submit">Sign In</Button>
              </form>
            </Tab>
            <Tab
              key={"signup"}
              title={"Sign Up"}
              as={Link}
              to="../signup"
              replace
              relative="path"
            >
              <form onSubmit={handleSignup}>
                <Input label="Username" name="username" isRequired />
                <Input label="Email" name="email" type="email" isRequired />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  isRequired
                />
                <Button type="submit">Sign Up</Button>
              </form>
            </Tab>
          </Tabs>
        </>
      )}
    </>
  );
}

export default AuthPage;
