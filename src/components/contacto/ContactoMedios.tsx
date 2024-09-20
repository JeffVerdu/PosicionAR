import "../../styles/contacto/contactoMedios.css";

export const ContactoMedios = () => {
  return (
    <div className="contacto-medios container-box">
      <div className="contacto-medio">
        <h3 className="contacto-title">Teléfonos</h3>

        <div className="contacto-items">
          <div className="contacto-item">
            <a href="https://wa.me/5492634905111" className="contacto-link">
              <img
                className="contacto-icono"
                src="/whatsapp.svg"
                alt="Whatsapp"
              />
              263 490 5111
            </a>
          </div>
          {/* Fin contacto-item */}
          <div className="contacto-item">
            <a href="https://wa.me/5492615793750" className="contacto-link">
              <img
                className="contacto-icono"
                src="/whatsapp.svg"
                alt="Whatsapp"
              />
              261 579 3750
            </a>
          </div>
          {/* Fin contacto-item */}
        </div>
        {/* Fin contacto-items */}
      </div>
      {/* Fin contacto-medio */}

      <div className="contacto-medio">
        <h3 className="contacto-title">Correos</h3>
        <div className="contacto-items">
          <div className="contacto-item">
            <a href="mailto:ejemplo1@gmail.com" className="contacto-link">
              <img className="contacto-icono" src="/gmail.svg" alt="Whatsapp" />
              posicionarenlinea@gmail.com
            </a>
          </div>
          {/* Fin contacto-item */}
        </div>
        {/* Fin contacto-items */}
      </div>
      {/* Fin contacto-medio */}

      <div className="contacto-medio">
        <h3 className="contacto-title">Redes Sociales</h3>
        <div className="contacto-items">
          <div className="contacto-item-red">
            <a
              href="https://www.facebook.com/profile.php?id=61564581646713"
              className="contacto-link"
              target="_blank"
            >
              <img
                className="contacto-icono"
                src="/facebook.svg"
                alt="Facebook"
              />
              Facebook - Posicionar EnLinea
            </a>
          </div>
          {/* Fin contacto-item */}
          <div className="contacto-item-red">
            <a
              href="https://www.instagram.com/enlineaposicionar"
              className="contacto-link"
              target="_blank"
            >
              <img
                className="contacto-icono"
                src="/instagram.svg"
                alt="Whatsapp"
              />
              Instagram - Posicionar EnLinea
            </a>
          </div>
          {/* Fin contacto-item */}
        </div>
        {/* Fin contacto-items */}
      </div>
      {/* Fin contacto-medio */}
    </div>
  );
};
