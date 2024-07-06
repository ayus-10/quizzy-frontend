import { useEffect, useState } from "react";
import styles from "../styles/admin-sidebar.module.css";
import { FaUser } from "react-icons/fa";
import Button from "./button";
import handleLogout from "../utils/handle-logout";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

type AdminSidebarProps = {
  userEmail: string | null;
};

export default function AdminSidebar(props: AdminSidebarProps) {
  const { userEmail } = props;

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<string | undefined>(undefined);

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const navLinks = [
    { title: "create", path: "/admin/create" },
    { title: "manage", path: "/admin/manage" },
    { title: "result", path: "/admin/result" },
  ];

  const location = useLocation();

  function getCurrentPageFromPath() {
    const currentLocation = navLinks.find((link) => {
      return location.pathname.includes(link.title);
    });
    return currentLocation?.title;
  }

  useEffect(() => setCurrentPage(() => getCurrentPageFromPath()), [location]);

  return (
    <>
      <button
        className={styles.hamburger}
        onClick={() => setShowMobileSidebar((prev) => !prev)}
      >
        {showMobileSidebar ? <IoMdClose /> : <HiMiniBars3 />}
      </button>
      <div
        className={`${styles.container} ${
          showMobileSidebar && styles.container_visible
        }`}
      >
        <nav className={styles.nav}>
          {navLinks.map((link) => {
            const isActive = link.title === currentPage;

            return (
              <button
                key={link.title}
                onClick={() => navigate(link.path)}
                className={`${styles.button} ${
                  isActive && styles.active_button
                }`}
              >
                <div
                  className={`${styles.button_mark} ${
                    isActive && styles.active_button_mark
                  }`}
                />
                <span className={styles.button_text}>{link.title}</span>
              </button>
            );
          })}
        </nav>

        <button
          className={styles.button}
          onClick={() => setShowLogoutPopup(true)}
        >
          <div
            className={`${styles.button_mark} ${styles.active_button_mark}`}
          />
          <span className={styles.button_text}>Log out</span>
        </button>

        <div
          className={styles.popup_container}
          style={{ display: showLogoutPopup ? "block" : "none" }}
        >
          <div className={styles.popup}>
            <div className={styles.user_info}>
              <div className={styles.user_icon}>
                <FaUser />
              </div>
              <span className={styles.user_email}>{userEmail}</span>
            </div>
            <div className={styles.confirm}>
              <p>Are you sure you want to log out?</p>
              <div className={styles.buttons}>
                <Button title="Yes" action={handleLogout} secondaryColor />
                <Button title="No" action={() => setShowLogoutPopup(false)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
