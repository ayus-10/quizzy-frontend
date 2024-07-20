import { useContext } from "react";
import useAuthentication from "../hooks/use-authentication";
import {
  AuthenticatedUserContext,
  IAuthenticatedUserContext,
} from "../contexts/authenticated-user.context";
import AdminSidebar from "../components/admin-sidebar";
import styles from "../styles/admin.module.css";
import { HashLoader } from "react-spinners";
import { Outlet } from "react-router-dom";

export default function Admin() {
  useAuthentication();

  const { email } = useContext(
    AuthenticatedUserContext
  ) as IAuthenticatedUserContext;

  switch (typeof email) {
    case "string":
      return (
        <main className={styles.main_container}>
          <AdminSidebar userEmail={email} />
          <Outlet />
        </main>
      );
    default:
      return (
        <div className={styles.loader}>
          <HashLoader color="#f43f5e" size={60} />
          <p>Please wait</p>
        </div>
      );
  }
}
