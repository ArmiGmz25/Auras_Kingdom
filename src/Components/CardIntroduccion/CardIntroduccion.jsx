import React from "react";
import styles from "./CardIntroduccion.module.css";
import AuraBattle from "../../assets/IMAGES/Aura_Battle.png";

export default function CardIntroduccion() {
  return (
    <>
      <div className={styles.carouselBox}>
        <div className={styles.center}>
          <div className={styles["desc-card"]}>
            <section
              className={styles["story-card"]}
              aria-labelledby="princesa-title"
            >
              <img src={AuraBattle} alt="Aura en batalla" />
              <div>
                <h3 id="princesa-title">La Princesa Guerrera</h3>
                <p className={styles.paragraph}>
                  En un reino olvidado por el tiempo, nació{" "}
                  <strong>Aura</strong>, una princesa destinada no solo a
                  gobernar, sino a luchar por la paz de su mundo. Entre portales
                  misteriosos, dragones guardianes y criaturas mágicas, Aura
                  debe descubrir el poder escondido en su corazón para salvar al
                  reino de la oscuridad.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
