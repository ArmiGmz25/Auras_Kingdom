import React, { useEffect, useRef } from "react";
import styles from "./Timeline.module.css";
import nacimientoVinculo from "../../assets/IMAGES/nacimiento-vinculo.png";
import primerEncuentro from "../../assets/IMAGES/primer-encuentro.png";
import monstruosAtacan from "../../assets/IMAGES/monstruos-atacan.png";
import elegidaSalvadora from "../../assets/IMAGES/elegida.png";

export default function Timeline({
  title = "Crónicas del Reino",
  subtitle = "El nacimiento de la aventura",
  items,
}) {
  const defaultItems = [
    {
      date: "Era de la Aurora",
      title: "Nacimiento del Vínculo",
      description:
        "Los primeros pactos entre espíritus y guardianes encendieron el firmamento.",
      image: nacimientoVinculo,
    },
    {
      date: "Criaturas Místicas",
      title: "La Aparición de los Elementales",
      description:
        "Los Elementales se manifiestan en nuestro mundo como resultado del pacto.",
      image: primerEncuentro,
    },
    {
      date: "Luna Carmesí",
      title: "El Asedio del Reino",
      description:
        "Con la aparición de los Elementales, otras entidades malvadas aparecen para atacar el reino.",
      image: monstruosAtacan,
    },
    {
      date: "La Elegida",
      title: "Momento de Salvar el Reino",
      description:
        "Se elige a la chica de la profesía destinada a salvar el reino.",
      image: elegidaSalvadora,
    },
  ];
  const data = Array.isArray(items) && items.length ? items : defaultItems;

  const containerRef = useRef(null);
  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll(`.${styles.item}`);
    if (!nodes || !nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </header>

      <div className={styles.timeline} ref={containerRef}>
        <div className={styles.line} aria-hidden="true" />
        {data.map((ev, idx) => {
          const sideClass = idx % 2 === 0 ? styles.left : styles.right;
          return (
            <article
              className={`${styles.item} ${sideClass}`}
              key={ev.id ?? idx}
            >
              <div className={styles.marker}>
                <span className={styles.core} />
              </div>

              <div className={styles.card}>
                <div className={styles.meta}>
                  <span className={styles.date}>{ev.date}</span>
                </div>
                <h3 className={styles.cardTitle}>{ev.title}</h3>
                <p className={styles.desc}>{ev.description}</p>
                {ev.image && (
                  <img
                    className={styles.image}
                    src={ev.image}
                    alt={ev.title}
                    loading="lazy"
                  />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
