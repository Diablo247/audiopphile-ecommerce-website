// next.config.js
const nextConfig = {
  // ✅ explicitly tell Next.js to use Webpack instead of Turbopack

  webpack: (config: { resolve: { alias: { [x: string]: string } } }) => {
    // ✅ Force react-hook-form to use client build
    config.resolve.alias["react-hook-form"] = require.resolve(
      "react-hook-form/dist/index.mjs"
    );
    return config;
  },
};

module.exports = nextConfig;
