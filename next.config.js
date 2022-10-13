/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["ecomm.skydone.net"],
  },
  i18n: {
    locales: ["es", "en-US", "fr", "nl-NL", "nl-BE"],
    defaultLocale: "es",
  },
};
