import "../../styles/contacto/contacto.css";

export const Contacto = () => {
  return (
    <section className="section-box">
      <div className="contacto-content container-box">
        <h2 className="section-title">Contacto</h2>

        <div className="textoContacto-grid">
          <p>
            Si estás interesado en publicar un anuncio para promocionar tu
            negocio, no dudes en contactarnos a través de todos los medios que
            tenemos disponibles para vos. Te brindaremos la mejor atención y
            asesoría.
          </p>
          <img src="/grafico.svg" alt="Gráfico" />
        </div>

        <div className="contacto-medios">
          <div className="contacto-medio">
            <h3>Teléfonos</h3>

            <div className="contacto">
              <div className="contacto-tlf">
                <div className="contacto-num">
                  <img
                    className="contacto-icono"
                    src="/whatsapp.svg"
                    alt="Whatsapp"
                  />
                  <a href="https://wa.me/5492622249006">2622 24 9006</a>
                </div>
                <p className="contacto-nombre">Roberto</p>
              </div>
              <div className="contacto-tlf">
                <div className="contacto-num">
                  <img
                    className="contacto-icono"
                    src="/whatsapp.svg"
                    alt="Whatsapp"
                  />
                  <a href="https://wa.me/5492622249006">2622 24 9006</a>
                </div>
                <p className="contacto-nombre">Roberto</p>
              </div>
              <div className="contacto-tlf">
                <div className="contacto-num">
                  <img
                    className="contacto-icono"
                    src="/whatsapp.svg"
                    alt="Whatsapp"
                  />
                  <a href="https://wa.me/5492622249006">2622 24 9006</a>
                </div>
                <p className="contacto-nombre">Roberto</p>
              </div>
            </div>
          </div>

          <div className="contacto-medio">
            <h3>Correos</h3>

            <div className="contacto">
              <div className="contacto-correo">
                <img className="contacto-icono" src="/gmail.svg" alt="Gmail" />
                <a href="mailto:ejemplo1@gmail.com">ejemplo1@gmail.com</a>
              </div>
              <div className="contacto-correo">
                <img className="contacto-icono" src="/gmail.svg" alt="Gmail" />
                <a href="mailto:ejemplo2@gmail.com">ejemplo2@gmail.com</a>
              </div>
              <div className="contacto-correo">
                <img className="contacto-icono" src="/gmail.svg" alt="Gmail" />
                <a href="mailto:ejemplo2@gmail.com">ejemplo3@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="contacto-medio">
            <h3>Redes Sociales</h3>

            <div className="contacto">
              <a
                href="https://www.facebook.com"
                target="_blank"
                className="contacto-red"
              >
                <img
                  className="contacto-icono"
                  src="/facebook.svg"
                  alt="Facebook"
                />
                <p>Facebook</p>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                className="contacto-red"
              >
                <img
                  className="contacto-icono"
                  src="/instagram.svg"
                  alt="Instagram"
                />
                <p>Instagram</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
