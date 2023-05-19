import { Drawer } from "@mui/material";
import styles from "./HamburgerMenu.module.scss";
import { useRouter } from "next/router";
import { useAuth } from "providers/AuthProvider";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HamburgerMenuItemProps {
  text: string;
  onClick: () => void;
}

export const HamburguerMenu = ({ isOpen, onClose }: HamburgerMenuProps) => {
  const router = useRouter();
  const { openLoginSignup } = useAuth();

  const handleClick = () => {
    const scrollToElement = document.getElementById("firstSection");

    if (scrollToElement) {
      window.scrollTo({
        top: scrollToElement.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={() => onClose()} className={styles.drawer}>
      <div className={styles.drawerContainer}>
        <HamburgerMenuItem
          onClick={() => {
            onClose();
            openLoginSignup();
          }}
          text="Login / Register"
        />
        <HamburgerMenuItem
          onClick={() => {
            handleClick();
            onClose();
          }}
          text="About Us"
        />
        <HamburgerMenuItem onClick={() => router.push("https://blog.kurby.ai/")} text="Blog" />
      </div>
    </Drawer>
  );
};

const HamburgerMenuItem = ({ text, onClick }: HamburgerMenuItemProps) => {
  return (
    <div onClick={() => onClick()} className={styles.hamburgerMenuItem}>
      {text}
    </div>
  );
};
