import { useRouter } from "next/router";
import styles from "./Navbar.module.scss";

/**
 * Navbar
 * @description: Top nav bar with icons
 */
export default function Navbar() {
  const router = useRouter();

  return (
    <>
      <div className={styles.content}>
        <div className={styles.logo} onClick={() => router.push("/")}></div>
      </div>
    </>
  );
}
