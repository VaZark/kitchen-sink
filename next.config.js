const isProd = process.env.NODE_ENV === "production";

module.exports = {
    assetPrefix: isProd ? "/kitchen-sink/" : "",
    images: {
        unoptimized: true,
    },
    output: 'export',
    experimental: {
      appDir: true,
    },
    webpack: function (config) {
        config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader",
        });
        return config;
    },
};
