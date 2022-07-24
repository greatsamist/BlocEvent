/**
 * Next Config
 * @type {import('next').NextConfig}
 */

// const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // compress: true,
  // swcMinify: false,
  // reactStrictMode: true,
  // poweredByHeader: false,
  // productionBrowserSourceMaps: false,
  // compiler: {
  //   styledComponents: true,
  // },
  // i18n: {
  //   locales: ["en-US"],
  //   defaultLocale: "en-US",
  //   localeDetection: true,
  // },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: {
    loader: "akamai",
    path: "",
  },
  trailingSlash: true,
  // assetPrefix: isProd ? "https://blocevent-r5euy.spheron.app/" : "",
};

module.exports = nextConfig;
