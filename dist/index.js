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

  //Remove duplicate
  for (let link of this._compiler.options.injectLink) {
    if (link.onlineUrl == onlineUrl) {
      return "";
    }
  }

  //Inspect our umd file's version
  //judge is this match sina umd component
  if (/mjs.sinaimg.cn\/umd/.test(onlineUrl)) {
    let options = this._compiler.options;
    if (!options.injectLinkComponent) {
      options.injectLinkComponent = [];
    }

    let [full, name, version] = onlineUrl.match(
      /mjs.sinaimg.cn\/umd\/([\w-]*)\/([\w-.]*)\//
    );

    //a sian umd component must only have one version
    for (let component of options.injectLinkComponent) {
      if (name == component.name) {
        if (version != component.version) {
          console.error(
            `\n 引用了umd组件${name}的不同版本：\n ${onlineUrl} \n ${
              component.onlineUrl
            },\n 该组件将不被模版html引用，请整理依赖!`
          );
          options.injectLink = options.injectLink.filter(link => {
            if (link.onlineUrl == component.onlineUrl) {
              return false;
            }
            return true;
          });
        }
        return "";
      }
    }

    options.injectLinkComponent.push({
      name,
      version,
      onlineUrl
    });
  }

  //Set the link into compiler's option
  this._compiler.options.injectLink.push({
    type,
    inject,
    onlineUrl
  });

  return "";
}
