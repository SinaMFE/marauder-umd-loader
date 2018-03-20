"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loader;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _loaderUtils = require("loader-utils");

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _schemaUtils = require("schema-utils");

var _schemaUtils2 = _interopRequireDefault(_schemaUtils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function getPackageJson(url) {
  if (!_fs2.default.existsSync(_path2.default.join(url, "./package.json"))) {
    return getPackageJson(_path2.default.dirname(url));
  } else {
    return require(_path2.default.join(url, "./package.json"));
  }
}
function loader(source) {
  let me = this;

  let options = _loaderUtils2.default.getOptions(this) || {};

  let type = options.type ? options.type : "js";
  let inject = options.inject ? options.inject : "body";
  let onlineUrl = options.onlineUrl;

  if (!onlineUrl) {
    return "";
  }

  if (!this._compiler.options.injectLink) {
    this._compiler.options.injectLink = [];
  }

  this._compiler.options.injectLink.push({
    type,
    inject,
    onlineUrl
  });

  //   var contextPath = this.context;
  //   var pj = getPackageJson(contextPath);
  //   var inject = options.inject || "body";

  //   if (me._compilation.compiler["umdPath"] == null) {
  //     me._compilation.compiler["umdPath"] = {
  //       body: {},
  //       head: {}
  //     };
  //   }
  //   if (options.onlineUrl != null) {
  //     me._compilation.compiler["umdPath"][inject][options.onlineUrl] = {
  //       entry: options.onlineUrl
  //     };
  //   } else if (pj.name.indexOf("@mfelibs") >= 0) {
  //     var moduleName = pj.name.split("/")[1];
  //     me._compilation.compiler["umdPath"][inject][moduleName] = {
  //       entry:
  //         "https://mjs.sinaimg.cn/umd/" +
  //         moduleName +
  //         "/" +
  //         pj.version +
  //         "/index.all.min.js"
  //     };
  //   } else {
  //     throw "不支持非@mfelibs域下的组件";
  //   }
  return "";
}
