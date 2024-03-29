/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: ["react-dnd", "react-dnd-html5-backend", "dnd-core", "@react-dnd/invariant", "@react-dnd/asap", "@react-dnd/shallowequal"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
