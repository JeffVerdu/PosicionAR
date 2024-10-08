import "../styles/contacto/contacto.css";

export const Contacto = () => {
  return (
    <section className="section-box">
      <div className="contacto-content container-box">
        <h2 className="section-title">Contacto</h2>

        <div className="textoContacto-grid">
          <p>
            Si estás interesado en publicar un anuncio para promocionar tu
            negocio, no dudes en contactarnos a través de cualquier medio de los
            que tenemos disponibles para vos. Te brindaremos la mejor atención y
            asesoría.
          </p>
          <img src="/grafico.svg" alt="Gráfico" />
        </div>
      </div>
    </section>
  );
};
