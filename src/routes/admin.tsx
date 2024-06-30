import { useContext } from "react";
import useAuthentication from "../hooks/use-authentication";
import {
  AuthenticatedUserContext,
  IAuthenticatedUserContext,
} from "../contexts/authenticated-user.context";
import AdminSidebar from "../components/admin-sidebar";
import styles from "../styles/admin.module.css";
import { HashLoader } from "react-spinners";

export default function Admin() {
  useAuthentication();

  const { email } = useContext(
    AuthenticatedUserContext
  ) as IAuthenticatedUserContext;

  switch (typeof email) {
    case "string":
      return (
        <>
          <AdminSidebar userEmail={email} />
        </>
      );
    default:
      return (
        <div className={styles.loading_container}>
          <HashLoader color="#f43f5e" size={100} />
          <p>Please wait</p>
        </div>
      );
  }
}
