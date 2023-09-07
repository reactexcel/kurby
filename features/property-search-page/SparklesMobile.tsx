import styles from "./SparklesMobile.module.scss";
import RectangleVector from "../../public/icons/rectangle-vector.svg";
import StarVector from "../../public/icons/star-vector.svg";
import StarVectorSemi from "../../public/icons/star-vector-semi.svg";

export function SparklesMobile() {
  return (
    <>
      <div className={styles.rectangleVector}>
        <RectangleVector />
      </div>
      <div className={styles.starVector}>
        <StarVector />
      </div>
      <div className={styles.starVectorSemi}>
        <StarVectorSemi />
      </div>
      <div className={styles.rectangleVector2}>
        <RectangleVector />
      </div>
      {/*
      <div className={styles.starVector2}>
        <StarVector />
      </div>
      <div className={styles.starVectorSemi2}>
        <StarVectorSemi />
      </div>
      <div className={styles.rectangleVector3}>
        <RectangleVector />
      </div> */}
    </>
  );
}
