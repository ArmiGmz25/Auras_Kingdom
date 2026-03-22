import React, { useEffect, useMemo, useRef, useState } from "react";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import styles from "./Constelacion.module.css";

export default function Constelacion({
  density = 70,
  color = "#ffffff",
  linkColor = "#ffb6d9",
  speed = 0.35,
  height = 280,

  heading = "Bajo el cielo del Reino",
  subheading = "Las constelaciones susurran nombres antiguos",

  revealOnce = true,
  revealDelayMs = 80,
  fullBleed = false,
}) {
  const [ready, setReady] = useState(false);
  const rootRef = useRef(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setReady(true));
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let revealed = false;
    let timerId;

    const toVisible = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => setVisible(true), revealDelayMs);
    };

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            toVisible();
            if (revealOnce) {
              revealed = true;
              obs.unobserve(el);
            }
          } else if (!revealOnce && !revealed) {
            setVisible(false);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.05,
      },
    );

    obs.observe(el);

    const safety = setTimeout(() => setVisible(true), 900);

    return () => {
      obs.disconnect();
      clearTimeout(timerId);
      clearTimeout(safety);
    };
  }, [revealOnce, revealDelayMs]);

  const options = useMemo(
    () => ({
      background: { color: "transparent" },
      fullScreen: { enable: false },
      detectRetina: true,
      fpsLimit: 60,
      particles: {
        number: { value: density, density: { enable: true, area: 800 } },
        color: { value: color },
        shape: { type: "circle" },
        shadow: {
          enable: true,
          blur: 12,
          color: { value: "#b388ff" },
          offset: { x: 0, y: 0 },
        },
        twinkle: {
          particles: {
            enable: true,
            color: { value: "#ffffff" },
            frequency: 2,
            opacity: 1,
          },
        },
        opacity: {
          value: { min: 0.45, max: 0.9 },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.45,
            sync: false,
          },
        },
        size: {
          value: { min: 1.8, max: 3.8 },
          animation: {
            enable: true,
            speed: 1.5,
            minimumValue: 1.2,
            sync: false,
          },
        },
        links: {
          enable: true,
          distance: 140,
          color: linkColor,
          opacity: 0.5,
          width: 1,
        },
        move: {
          enable: true,
          speed,
          direction: "none",
          outModes: { default: "bounce" },
          random: true,
          straight: false,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: ["repulse", "attract"] },
          onClick: { enable: false },
        },
        modes: {
          repulse: { distance: 120, duration: 0.3 },
          attract: { distance: 180, duration: 0.3 },
        },
      },
    }),
    [density, color, linkColor, speed],
  );

  const wrapperClass =
    `${styles.wrapper} ${
      visible ? styles.revealVisible : styles.revealHidden
    }` + (fullBleed ? ` ${styles.fullBleed}` : "");

  if (!ready) {
    return <div ref={rootRef} className={wrapperClass} style={{ height }} />;
  }

  return (
    <section
      ref={rootRef}
      className={wrapperClass}
      style={{ height }}
      aria-label="Fondo estelar con mensaje"
    >
      <Particles
        options={options}
        className={styles.layer}
        aria-hidden="true"
      />
      <div
        className={styles.headline}
        role="group"
        aria-roledescription="mensaje de sección"
      >
        <h2 className={styles.hTitle}>{heading}</h2>
        <p className={styles.hSubtitle}>{subheading}</p>
      </div>
    </section>
  );
}
