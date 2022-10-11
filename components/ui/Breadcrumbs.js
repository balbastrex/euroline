import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const convertBreadcrumb = (string) => {
  return string
    .replace(/[/]/g, "_")
    .replace(/-/g, " ")
    .replace(/_/g, "")
    .replace(/ö/g, "oe")
    .replace(/ä/g, "ae")
    .replace(/ü/g, "ue")
    .toUpperCase();
};

const Breadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <section id="breadcrumbs">
      <div className="container breadcrumbs">
        <Link href="/" passHref>
          <a>HOME</a>
        </Link>
        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <Link href={breadcrumb.href} key={breadcrumb.href}>
              <a>{convertBreadcrumb(breadcrumb.breadcrumb)}</a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Breadcrumbs;
