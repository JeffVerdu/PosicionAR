import "../../styles/contacto/contactoMedios.css";

export const ContactoMedios = () => {
  return (
    <div className="contacto-medios">
      <div className="contacto-medio">
        <h3 className="contacto-title">Teléfonos</h3>

        <div className="contacto-items">
          <div className="contacto-item">
            <a href="https://wa.me/5492622249006" className="contacto-link">
              <img
                className="contacto-icono"
                src="/whatsapp.svg"
                alt="Whatsapp"
              />
              2622 24 9006
            </a>
            <p className="contacto-nombre">Roberto</p>
          </div>
          {/* Fin contacto-item */}
          <div className="contacto-item">
            <a href="https://wa.me/5492622249006" className="contacto-link">
              <img
                className="contacto-icono"
                src="/whatsapp.svg"
                alt="Whatsapp"
              />
              2622 24 9006
            </a>
            <p className="contacto-nombre">Roberto</p>
          </div>
          {/* Fin contacto-item */}
          <div className="contacto-item">
            <a href="https://wa.me/5492622249006" className="contacto-link">
              <img
                className="contacto-icono"
                src="/whatsapp.svg"
                alt="Whatsapp"
              />
              2622 24 9006
            </a>
            <p className="contacto-nombre">Roberto</p>
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
              ejemplo1@gmail.com
            </a>
          </div>
          {/* Fin contacto-item */}
          <div className="contacto-item">
            <a href="mailto:ejemplo2@gmail.com" className="contacto-link">
              <img className="contacto-icono" src="/gmail.svg" alt="Whatsapp" />
              ejemplo2@gmail.com
            </a>
          </div>
          {/* Fin contacto-item */}
          <div className="contacto-item">
            <a href="mailto:ejemplo3@gmail.com" className="contacto-link">
              <img className="contacto-icono" src="/gmail.svg" alt="Whatsapp" />
              ejemplo3@gmail.com
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
            <a href="https://www.facebook.com" className="contacto-link">
              <img
                className="contacto-icono"
                src="/facebook.svg"
                alt="Whatsapp"
              />
              Facebook
            </a>
          </div>
          {/* Fin contacto-item */}
          <div className="contacto-item-red">
            <a href="https://www.instagram.com" className="contacto-link">
              <img
                className="contacto-icono"
                src="/instagram.svg"
                alt="Whatsapp"
              />
              Instagram
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
