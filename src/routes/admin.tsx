import { useContext, useEffect } from "react";
import useAuthentication from "../hooks/use-authentication";
import {
  AuthenticatedUserContext,
  IAuthenticatedUserContext,
} from "../contexts/authenticated-user.context";
import AdminSidebar from "../components/admin-sidebar";
import styles from "../styles/admin.module.css";
import { HashLoader } from "react-spinners";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export default function Admin() {
  useAuthentication();

  const { email } = useContext(
    AuthenticatedUserContext
  ) as IAuthenticatedUserContext;

  const activeTab = useAppSelector((state) => state.activeTab);

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/admin/${activeTab}`);
  }, [activeTab]);

  switch (typeof email) {
    case "string":
      return (
        <main className={styles.container}>
          <AdminSidebar userEmail={email} />
          <Outlet />
        </main>
      );
    default:
      return (
        <div className={styles.loading_container}>
          <HashLoader color="#f43f5e" size={60} />
          <p>Please wait</p>
        </div>
      );
  }
}
