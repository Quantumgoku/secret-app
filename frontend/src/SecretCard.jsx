import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Textarea,
  Button,
} from "@nextui-org/react";

import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
export function SecretCard({ randomName, message }) {
  return (
    <div>
      <Card>
        <CardHeader>{randomName}</CardHeader>
        <CardBody>{message}</CardBody>
      </Card>
    </div>
  );
}

export function PostSecretCard({ setUserSecret }) {
  const navigate = useNavigate();
  const {
    user: { username },
  } = useContext(AuthContext);

  const postSecret = (details) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/secrets/add`, details)
        .then(({ data: { success, error, secret } }) => {
          console.log({ success, error, secret });
          if (success) {
            setUserSecret(secret);
            resolve();
          }
          reject(error);
        })
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rawFormData = Object.fromEntries(new FormData(e.currentTarget));
    console.log({ rawFormData });
    toast.promise(postSecret({ ...rawFormData, username }), {
      pending: "Posting secret . . .",
      success: {
        render: () => {
          setTimeout(() => {
            navigate(0, { replace: true });
          }, 3000);
          return "Secret posted successfully";
        },
      },
      error: {
        render: ({ data }) => {
          console.log({ data });
          return data?.message || data;
        },
      },
    });
  };
  return (
    <>
      <Card>
        <CardHeader>{username}</CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Textarea
              placeholder="All users are allowed to post only one secret/confession after which random name will be associated with each post."
              name="message"
            ></Textarea>
            <Button type="Submit">SUBMIT</Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
}
