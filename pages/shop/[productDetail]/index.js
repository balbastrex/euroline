import React from "react";
import Layout from "components/layout/Layout";
import {
  getAllProducts,
  getProduct,
  getPacks,
  getPackById,
} from "/api/apiRoutes";
import CardDetail from "components/detailPages/CardDetail";
import Spinner from "components/ui/Spinner";
import { useRouter } from "next/router";

function ShopPoducts({ productDetail, packDetail, addCart }) {
  const router = useRouter();
  let metaPage;
  let metaContent;

  if (router.isFallback) {
    return (
      <Layout page="Artículos">
        <div>
          <Spinner />
        </div>
      </Layout>
    );
  }

  {
    productDetail
      ? productDetail.meta_title !== null
        ? (metaPage = productDetail.meta_title)
        : productDetail.meta_title === null
        ? (metaPage = productDetail.name)
        : null
      : packDetail
      ? packDetail.meta_title !== null
        ? (metaPage = packDetail.meta_title)
        : packDetail.meta_title === null
        ? (metaPage = packDetail.name)
        : null
      : null;
  }

  {
    productDetail
      ? productDetail.meta_description !== null
        ? (metaContent = productDetail.meta_description)
        : productDetail.meta_description === null
        ? (metaContent = productDetail.description)
        : null
      : packDetail
      ? packDetail.meta_description !== null
        ? (metaContent = packDetail.meta_description)
        : packDetail.meta_description === null
        ? (metaContent = packDetail.description)
        : null
      : null;
  }

  return (
    <Layout page={metaPage} name="description" content={metaContent}>
      <CardDetail
        productDetail={productDetail}
        packDetail={packDetail}
        addCart={addCart}
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  let canonical = [];
  const products = await getAllProducts();
  const packs = await getPacks();
  {
    products
      ? (canonical = [...canonical, ...products])
      : packs
      ? (canonical = [...canonical, ...packs])
      : canonical;
  }

  const paths = canonical.map((product) => ({
    params: {
      productDetail: product.canonical_uri.replace(/[/]/g, "_"),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let productDetail;
  let packDetail;
  let productId;
  let packId;
  let productByCategoryPre = [];

  try {
    const products = await getAllProducts();
    const packs = await getPacks();

    if (products) {
      productByCategoryPre = [...productByCategoryPre, ...products];
    }
    if (packs) {
      productByCategoryPre = [...productByCategoryPre, ...packs];
    }

    productByCategoryPre.map((product) => {
      if (product.canonical_uri.replace(/[/]/g, "_") === params.productDetail) {
        if (product.ref) {
          packId = product.id;
        } else {
          productId = product.id;
        }
      }
    });
  } catch (error) {
    console.log(error);
  }

  if (productId) {
    productDetail = await getProduct(productId);
  }
  if (packId) {
    packDetail = await getPackById(packId);
  }

  return {
    props: {
      productDetail: productDetail || null,
      packDetail: packDetail || null,
    },
    revalidate: 10,
  };
}

export default ShopPoducts;
