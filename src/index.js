"use strict";
import fs from "fs";
import path from "path";
import loaderUtils from "loader-utils";
import validateOptions from "schema-utils";

function getPackageJson(url){
    if(!fs.existsSync(path.join(url,"./package.json"))){
        return getPackageJson(path.dirname(url));
    }
    else{
        return require(path.join(url,"./package.json"));
    }
}
export default function loader(source) {
    var me=this;
    var contextPath = this.context;
    var pj = getPackageJson(contextPath);
    if(pj.name.indexOf("@mfelibs")>=0){
        var moduleName = pj.name.split("/")[1];
        if(me._compilation["umdPath"]==null){
            me._compilation["umdPath"]={};
        }
        me._compilation["umdPath"][moduleName]={
            entry:"https://mjs.sinaimg.cn/umd/"+moduleName+"/"+pj.version+"/index.all.min.js"
        }
    }
    else{
        throw "不支持非@mfelibs域下的组件";
    }

    return "";
}
