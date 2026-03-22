import React, { useState } from "react";
import styles from "./TreasureCards.module.css";
import Espada from "../../assets/CARDS/espada.webp";
import Amuleto from "../../assets/CARDS/amuleto.webp";
import Grimorio from "../../assets/CARDS/grimorio.webp";
import Alas from "../../assets/CARDS/alas.webp";
import CardBack from "../../assets/CARDS/card_back.webp";

const CARDS = [
  {
    name: "Espada de la Aurora",
    img: Espada,
    desc: "Forjada con luz pura, otorga valor y claridad a su portador.",
  },
  {
    name: "Amuleto del Corazón",
    img: Amuleto,
    desc: "Guarda los recuerdos y emociones más profundas del alma.",
  },
  {
    name: "Grimorio del Portal",
    img: Grimorio,
    desc: "Contiene los conjuros para abrir caminos hacia otros reinos.",
  },
  {
    name: "Alas Encantadas",
    img: Alas,
    desc: "Permiten viajar entre sueños y realidades sin dejar rastro.",
  },
];

export default function TreasureCards() {
  const [open, setOpen] = useState(Array(CARDS.length).fill(false));
  const [modalData, setModalData] = useState(null);

  const toggle = (idx) => {
    setOpen((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const onKeyDown = (e, idx) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(idx);
    }
  };

  const openModal = (card) => {
    setModalData(card);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <>
      <section className={styles.Box}>
        <h2 className={styles["treasures-title"]}>Tesoros Encantados</h2>
        <p className={styles["treasures-desc"]}>
          Cada carta oculta un artefacto del Reino. Toca para revelarlo.
        </p>

        <div className={styles["treasure-grid"]}>
          {CARDS.map((c, i) => {
            const isOpen = open[i];

            return (
              <article
                key={c.name}
                className={`${styles["flip-card"]} ${
                  isOpen ? styles["is-open"] : ""
                }`}
                data-name={c.name}
              >
                <div
                  className={styles["flip-trigger"]}
                  role="button"
                  tabIndex={0}
                  aria-label={`Mostrar ${c.name}`}
                  aria-expanded={isOpen}
                  onClick={() => toggle(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                >
                  <div className={styles["flip-card-inner"]}>
                    <div
                      className={`${styles["flip-face"]} ${styles["flip-front"]}`}
                      style={{ "--img": `url(${c.img})` }}
                      aria-hidden={!isOpen}
                    >
                      <button
                        className={styles.btnPrimary}
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(c);
                        }}
                      >
                        Detalles
                      </button>
                    </div>

                    <div
                      className={`${styles["flip-face"]} ${styles["flip-back"]}`}
                      style={{ "--img": `url(${CardBack})` }}
                      aria-hidden={isOpen}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {modalData && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>{modalData.name}</h3>
            <p>{modalData.desc}</p>
            <button className={styles.btnPrimary} onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
