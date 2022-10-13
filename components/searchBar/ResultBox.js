import Link from "next/link";
import React from "react";

export default function ResultBox(item) {
  const slug = item.slug.canonical_uri.replace(/[/]/g, "_");

  return (
    <div>
      <picture>
        <img src={"https://picsum.photos/200"} type="image/webp" alt="" />
      </picture>
      <Link
        href={{
          pathname: "/shop/[slug]",
          query: { slug: slug },
        }}
        as={`/shop/${slug}`}
      >
        <a>{item.name}</a>
      </Link>
      <p>650.00€</p>
    </div>
  );
}
