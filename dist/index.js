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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPackageJson(url) {
    if (!_fs2.default.existsSync(_path2.default.join(url, "./package.json"))) {
        return getPackageJson(_path2.default.dirname(url));
    } else {
        return require(_path2.default.join(url, "./package.json"));
    }
}
function loader(source) {
    var me = this;
    var contextPath = this.context;
    var pj = getPackageJson(contextPath);
    if (pj.name.indexOf("@mfelibs") >= 0) {
        var moduleName = pj.name.split("/")[1];
        if (me._compilation["umdPath"] == null) {
            me._compilation["umdPath"] = {};
        }
        me._compilation["umdPath"][moduleName] = {
            entry: "https://mjs.sinaimg.cn/umd/" + moduleName + "/" + pj.version + "/index.all.min.js"
        };
    } else {
        throw "不支持非@mfelibs域下的组件";
    }

    return "";
}