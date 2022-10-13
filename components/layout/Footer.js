const Footer = () => {
  return (
    <footer>
      <div id="top-footer">
        <div className="container">
          <h2>www.convertcars.net</h2>
        </div>
      </div>
      <div id="footer">
        <div className="container">
          <div>
            <h6>CONVERT CARS</h6>
            <a href="#">Quiénes somos</a>
            <a href="#">Catálogo pdf</a>
            <a href="#">Anexo pdf</a>
            <a href="#">Noticias</a>
            <a href="#">Contacto</a>
            <a href="#">Descargas</a>
          </div>
          <div>
            <h6>COMPRAR</h6>
            <a href="#">Cómo comprar</a>
            <a href="#">Profesionales</a>
            <a href="#">Particulares</a>
            <a href="#">Condiciones de compra</a>
            <a href="#">Productos agotados temporalmente</a>
          </div>
          <div>
            <h6>LEGAL</h6>
            <a href="#">Condiciones de uso</a>
            <a href="#">Aviso Legal</a>
            <a href="#">Política de Privacidad</a>
          </div>
          <div className="boletin">
            <h6>Boletín de noticias Convert Cars</h6>
            <form id="boletin">
              <input type="mail" placeholder="Escribe tu email" />
              <span></span>
              <input type="checkbox" />
              <span className="privacidad">
                Acepto la <a href="#">política de privacidad</a>.
              </span>
              <input type="submit" value="Suscribirme" />
            </form>
          </div>
        </div>
      </div>
      <div id="copyright">
        <div className="container">
          <p>
            &copy; EUROLINE - {new Date().getFullYear()}. EUROLINE
            <span className="simbolo">&reg;</span> es una marca registrada.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
