import styles from "./Navbar.module.css";

/**
 * Navbar
 * @description: Top nav bar with icons
*/
export default function Navbar() {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.logo}></div>
      </div>
    </>
  );
}
