import { useState, useRef, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import styles from "./Footer.module.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  const validate = (value) => {
    if (!value || !value.trim()) return "Por favor, escribe tu correo.";

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!re.test(value.trim())) {
      return "Escribe un correo válido (ej. nombre@dominio.com).";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const msg = validate(cleanEmail);
    setError(msg);

    if (msg) return;

    try {
      setLoading(true);

      const { error: insertError } = await supabase.from("subscribers").insert([
        {
          email: cleanEmail,
          source: "footer",
        },
      ]);

      if (insertError) {
        console.error("Error insertando suscriptor:", insertError);

        if (insertError.code === "23505") {
          setError("Ese correo ya está suscrito.");
          return;
        }

        setError("No se pudo registrar tu suscripción. Intenta de nuevo.");
        return;
      }

      setEmail("");
      setOpen(true);
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Ocurrió un error inesperado. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === "Escape" && open) handleClose();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [open]);

  return (
    <footer className={styles["ak-footer"]} role="contentinfo">
      <div className={styles["ak-footer__inner"]}>
        <div className={styles["ak-footer__cta"]}>
          <h3 className={styles["ak-footer__title"]}>
            ¿Te unes a la aventura?
          </h3>

          <p className={styles["ak-footer__subtitle"]}>
            Suscríbete para enterarte cuando el juego avance ✨
          </p>

          <form
            className={styles["ak-subscribe"]}
            onSubmit={handleSubmit}
            noValidate
          >
            <label className={styles["sr-only"]} htmlFor="ak-email">
              Correo electrónico
            </label>

            <input
              id="ak-email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              aria-invalid={!!error}
              aria-describedby={error ? "ak-email-error" : undefined}
              required
              disabled={loading}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Suscribirme"}
            </button>

            <span
              id="ak-email-error"
              className={styles.errorText}
              role={error ? "alert" : undefined}
            >
              {error || ""}
            </span>
          </form>
        </div>

        <div className={styles["ak-footer__legal"]}>
          <p>© 2025 Aura&apos;s Kingdom. Todos los derechos reservados.</p>
        </div>
      </div>

      {open && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="subscribe-title"
          aria-describedby="subscribe-desc"
          ref={dialogRef}
          onClick={(e) => {
            if (e.target === dialogRef.current) handleClose();
          }}
        >
          <div className={styles.modal}>
            <h4 id="subscribe-title" className={styles.modalTitle}>
              ¡Suscripción registrada!
            </h4>

            <p id="subscribe-desc" className={styles.modalBody}>
              Te mantendremos actualizado por correo. 💌
            </p>

            <div className={styles.modalActions}>
              <button
                ref={closeBtnRef}
                className={styles.btnPrimary}
                onClick={handleClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
