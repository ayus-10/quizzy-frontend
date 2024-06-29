import { useContext, useEffect } from "react";
import {
  AuthenticatedUserContext,
  IAuthenticatedUserContext,
} from "../contexts/authenticated-user.context";
import getAuthenticatedUser from "../utils/get-authenticated-user";
import { useNavigate } from "react-router-dom";

export default function useAuthentication() {
  const { setEmail } = useContext(
    AuthenticatedUserContext
  ) as IAuthenticatedUserContext;

  const navigate = useNavigate();

  useEffect(() => {
    getAuthenticatedUser().then((res) => {
      if (res) {
        setEmail(res);
      } else {
        navigate("/login");
      }
    });
  }, []);
}
