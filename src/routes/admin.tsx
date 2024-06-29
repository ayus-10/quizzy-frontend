import { useContext } from "react";
import useAuthentication from "../hooks/use-authentication";
import {
  AuthenticatedUserContext,
  IAuthenticatedUserContext,
} from "../contexts/authenticated-user.context";
import AdminSidebar from "../components/admin-sidebar";

export default function Admin() {
  useAuthentication();

  const { email } = useContext(
    AuthenticatedUserContext
  ) as IAuthenticatedUserContext;

  return (
    <>
      <AdminSidebar userEmail={email} />
    </>
  );
}
