const isProd = process.env.NODE_ENV === "production";

module.exports = {
    webpack: function (config) {
        config.module.rules.push({
            test: /\.md$/,
            type: "asset/source",
        });
        return config;
    },
    assetPrefix: isProd ? "/kitchen-sink/" : ".",
    images: {
        unoptimized: true,
    },
    output: "standalone",
};
