const Footer = () => {
  return (
    <footer>
      <div id="top-footer">
        <div className="container">
          <h2>www.mipipo.es</h2>
        </div>
      </div>
      <div id="footer">
        <div className="container">
          <div>
            <h6>MI PIPO</h6>
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
            <h6>Boletín de noticias Mi Pipo</h6>
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
            &copy; MI PIPO - {new Date().getFullYear()}. Mi Pipo
            <span className="simbolo">&reg;</span> y Personaliza su pequeño
            mundo<span className="simbolo">&reg;</span> son marcas registradas
            en España y otros países.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
