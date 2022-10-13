import React from "react";
import Layout from "components/layout/Layout";
import Producto from "components/prueba/producto";
import HttpRequest from "components/prueba/HttpRequest";

function Home() {
  return (
    <Layout page="Tienda Tuning">
      <div className="container">
        <div>
          <HttpRequest />
          <Producto />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
