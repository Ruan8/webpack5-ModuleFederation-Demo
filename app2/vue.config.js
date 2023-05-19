const { defineConfig } = require("@vue/cli-service");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: "http://localhost:8082/",
    devServer: {
        port: "8082",
        // 配置允许跨域，解决热更新报错
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Method": "GET,POST,PUT,OPTIONS",
        },
    },
    chainWebpack: (config) => {
        config
            .plugin("module-feaderation-plugin")
            .use(ModuleFederationPlugin, [
                {
                    // 指定导出的容器名称
                    name: "app2",
                    // 打包生成的文件名称
                    filename: "remoteEntry.js",
                    // 导出对应的模块
                    exposes: {
                        "./HelloWorld": "./src/components/HelloWorld.vue",
                        "./utils": "./src/utils/index.js",
                    },
                    shared: {
                        vue: {
                            singleton: true,
                        },
                    },
                },
            ])
            .end()
            .optimization.delete("splitChunks");
    },
});
