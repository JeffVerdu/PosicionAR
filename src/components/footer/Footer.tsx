import "../../styles/footer/footer.css";
import { ContactoMedios } from "../contacto/ContactoMedios";

export const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-mediosbg"></div>
        <div className="footer-medios">
          <ContactoMedios />
        </div>
      </div>
      <p className="footer-text container-box">
        &copy; <span>PosicionAR!</span> Derechos reservados.
      </p>
    </footer>
  );
};
