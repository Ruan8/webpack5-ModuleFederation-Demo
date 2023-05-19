const { defineConfig } = require("@vue/cli-service");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        port: 8080,
    },
    chainWebpack: (config) => {
        config.plugin("module-feaderation-plugin").use(ModuleFederationPlugin, [
            {
                // 指定输出的容器名称
                name: "app1",
                // 引用远程的 expose 模块
                remotes: {
                    app2: "app2@http://localhost:8082/remoteEntry.js",
                },
                shared: {
                    vue: {
                        singleton: true,
                    },
                },
            },
        ]);
    },
});
