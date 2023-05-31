import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";
import { useAuth } from "providers/AuthProvider";
import { Menu } from "@mui/material";
import { useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { LoginSignupButton } from "components/LoginSignupButton/LoginSignupButton";

/**
 * Navbar
 * @description: Top nav bar with icons
 */
export default function Navbar() {
  const router = useRouter();
  const { user, openProfile, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const userRef = useRef(null);

  return (
    <>
      <div className={styles.content}>
        <div className={styles.logo} onClick={() => router.push("/")}></div>
        {user ? (
          <>
            <div ref={userRef} className={styles.user} onClick={() => setIsOpen(true)}>
              <img className={styles.userImage} src={user?.ProfileImageS3Url || "/images/user.webp"} alt=""></img>
              <div className={styles.userName}>
                {user?.FullName} <KeyboardArrowDownIcon />
              </div>
            </div>
            <Menu className={styles.menu} open={isOpen} onClose={() => setIsOpen(false)} anchorEl={userRef.current}>
              <div
                className={styles.menuItem}
                onClick={() => {
                  openProfile();
                  setIsOpen(false);
                }}
              >
                Profile
              </div>
              <div
                className={styles.menuItem}
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </div>
            </Menu>
          </>
        ) : (
          <LoginSignupButton />
        )}
      </div>
    </>
  );
}
