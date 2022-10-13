import Link from "next/link";
import React from "react";

export default function TopMenuCard(params) {
  const slug = params.category.slug;
  const name = params.category.name;
  const src = params.src;

  return (
    <Link
      href={{
        pathname: "/categories/[slug]",
        query: { slug: slug },
      }}
      as={`/categories/${slug}`}
    >
      <a className="hover">
        <picture>
          {/* <source src="/ico-chupete.png" type="image/webp" /> */}
          <img
            src={`${process.env.NEXT_PUBLIC_PRODUCT_IMAGE_URL}` + src}
            alt="logo"
          />
        </picture>
        <p>{name}</p>
      </a>
    </Link>
  );
}
