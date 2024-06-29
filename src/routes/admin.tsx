import { useContext } from "react";
import useAuthentication from "../hooks/use-authentication";
import {
  AuthenticatedUserContext,
  IAuthenticatedUserContext,
} from "../contexts/authenticated-user.context";

export default function Admin() {
  useAuthentication();

  const { email } = useContext(
    AuthenticatedUserContext
  ) as IAuthenticatedUserContext;

  return (
    <>
      <main>{email}</main>
    </>
  );
}
