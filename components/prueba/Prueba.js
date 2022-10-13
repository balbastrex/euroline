import Link from "next/link";
import React from "react";

const Prueba = () => {
  return (
    <div className="container">
      <ul>
        <li>Productos destacados</li>
        <li>Los más vendidos</li>
        <li>Novedades</li>
      </ul>
      <div className="formularios" style={{ minWidth: "10%", width: "100px" }}>
        <form>
          <input
            onClick={(e) => handleLogout(e)}
            type="submit"
            value="Descubrir más"
          />
          <Link href="/blog">Blog</Link>
        </form>
      </div>
    </div>
  );
};

export default Prueba;
