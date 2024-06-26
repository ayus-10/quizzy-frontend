import { useState } from "react";
import styles from "../styles/admin-sidebar.module.css";
import { FaUser } from "react-icons/fa";
import Button from "./button";
import handleLogout from "../utils/handle-logout";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setActiveTab } from "../redux/slices/active-tab.slice";

type ActiveTab = "create" | "manage" | "result";

type AdminSidebarProps = {
  userEmail: string | null;
};

export default function AdminSidebar(props: AdminSidebarProps) {
  const { userEmail } = props;

  const navButtons: ActiveTab[] = ["create", "manage", "result"];

  const dispatch = useAppDispatch();

  const activeTab = useAppSelector((state) => state.activeTab);

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

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
          {navButtons.map((buttonTitle) => {
            const isActive = buttonTitle === activeTab;

            return (
              <button
                key={buttonTitle}
                onClick={() => dispatch(setActiveTab(buttonTitle))}
                className={`${styles.button} ${
                  isActive && styles.active_button
                }`}
              >
                <div
                  className={`${styles.button_mark} ${
                    isActive && styles.active_button_mark
                  }`}
                />
                <span className={styles.button_text}>{buttonTitle}</span>
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
                <Button title="Yes" action={handleLogout} />
                <Button title="No" action={() => setShowLogoutPopup(false)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
