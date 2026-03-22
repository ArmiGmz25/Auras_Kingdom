import React from "react";
import styles from "./Heather.module.css";
import Logo from "../../assets/SVG/Logo.svg";
import BgImage from "../../assets/IMAGES/bg-image.png";

export default function Heather() {
  return (
    <>
      <header
        className={styles["bg-heather"]}
        style={{ "--bg-img": `url(${BgImage})` }}
      >
        <div className={styles.header}>
          <div className={styles["navBar-container"]}>
            <a href="#" className={styles.logo}>
              <img src={Logo} alt="Logo" />
            </a>

            <nav className={styles.navbar}>
              <a href="#" className={styles["nav-link"]}>
                Inicio
              </a>
            </nav>
          </div>
        </div>

        <div className={styles["hero-content"]}>
          <h1 className={styles["hero-title"]}>Aura&apos;s Kingdom</h1>
          <p className={styles["hero-subtitle"]}>La aventura comienza aquí</p>
        </div>
      </header>

      <div className={styles["titulo-Historia"]}>
        <h1>El principio de la historia</h1>
      </div>
    </>
  );
}
