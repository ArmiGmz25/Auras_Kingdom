import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import styles from "./CardsCarrousel.module.css";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Imágenes
import Aura from "../../assets/CARROUSEL/Aura.png";
import Eira from "../../assets/CARROUSEL/Eira.png";
import Eldran from "../../assets/CARROUSEL/Eldran.png";
import Frostin from "../../assets/CARROUSEL/Frostin.png";
import Kael from "../../assets/CARROUSEL/Kael.png";
import Lumen from "../../assets/CARROUSEL/Lumen.png";
import Syliph from "../../assets/CARROUSEL/Syliph.png";
import Zephyr from "../../assets/CARROUSEL/Zephyr.png";

export default function CardsCarrousel({
  title = "Personajes de la aventura",
  subtitle = "Espíritus y guardianes bajo la luz boreal",
  items,
  showBullets = true,
  loop = true,
}) {
  const defaults = [
    { img: Aura, name: "Aura", role: "Luz primordial" },
    { img: Kael, name: "Kael", role: "Guardián celeste" },
    { img: Eira, name: "Eira", role: "Hechicera boreal" },
    { img: Eldran, name: "Eldran", role: "Sabio runista" },
    { img: Frostin, name: "Frostin", role: "Zorro de hielo" },
    { img: Lumen, name: "Lumen", role: "Fuego celeste" },
    { img: Syliph, name: "Sylph", role: "Espíritu del bosque" },
    { img: Zephyr, name: "Zephyr", role: "Espíritu del viento" },
  ];

  const data = Array.isArray(items) && items.length ? items : defaults;

  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [cardStep, setCardStep] = useState(0);
  const [visible, setVisible] = useState(4);

  const calcVisible = useCallback((w) => {
    if (w <= 520) return 1;
    if (w <= 800) return 2;
    if (w <= 1100) return 3;
    return 4;
  }, []);

  const measure = useCallback(() => {
    if (!viewportRef.current || !trackRef.current) return;
    const vWidth = viewportRef.current.clientWidth;
    setVisible(calcVisible(vWidth));

    const firstCard = trackRef.current.querySelector(`.${styles.card}`);
    if (!firstCard) return;

    const rect = firstCard.getBoundingClientRect();
    const gapStr = getComputedStyle(trackRef.current).gap || "0";
    const gap = parseFloat(gapStr);
    setCardStep(rect.width + (isNaN(gap) ? 0 : gap));
  }, [calcVisible]);

  useEffect(() => {
    measure();
    const ro1 = new ResizeObserver(measure);
    const ro2 = new ResizeObserver(measure);
    if (viewportRef.current) ro1.observe(viewportRef.current);
    if (trackRef.current) ro2.observe(trackRef.current);
    return () => {
      ro1.disconnect();
      ro2.disconnect();
    };
  }, [measure]);

  const maxIndex = useMemo(
    () => Math.max(0, data.length - visible),
    [data.length, visible],
  );

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const prev = () => setIndex((i) => (i > 0 ? i - 1 : loop ? maxIndex : 0));
  const next = () => setIndex((i) => (i < maxIndex ? i + 1 : loop ? 0 : i));
  const goTo = (i) => setIndex(Math.max(0, Math.min(i, maxIndex)));

  return (
    <div className={styles.carouselBox}>
      <section className={styles.akCarousel}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </header>

        <div className={styles.carouselWrapper}>
          <IconButton
            aria-label="Anterior"
            onClick={prev}
            className={`${styles.navBtn} ${styles.leftBtn}`}
          >
            <ChevronLeftIcon />
          </IconButton>

          <div className={styles.viewport} ref={viewportRef}>
            <div
              className={styles.track}
              ref={trackRef}
              style={{ transform: `translateX(-${index * cardStep}px)` }}
            >
              {data.map((c, i) => (
                <article key={i} className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.square}>
                      <img src={c.img} alt={c.name} className={styles.image} />
                      <div className={styles.aurora} />
                    </div>
                    <div className={styles.ribbon}>
                      <h3 className={styles.name}>{c.name}</h3>
                      <span className={styles.role}>{c.role}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <IconButton
            aria-label="Siguiente"
            onClick={next}
            className={`${styles.navBtn} ${styles.rightBtn}`}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>

        {showBullets && (
          <div className={styles.bullets}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                className={`${styles.bullet} ${
                  i === index ? styles.active : ""
                }`}
                onClick={() => goTo(i)}
                aria-label={`Ir a la posición ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
