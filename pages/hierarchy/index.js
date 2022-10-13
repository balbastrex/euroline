import React from "react";
import Layout from "components/layout/Layout";
import Hierarchy from "./Hierarchy";

function Index() {
  return (
    <Layout page="Tienda Tuning">
      <div className="container">
        <Hierarchy />
      </div>
    </Layout>
  );
}

export default Index;
