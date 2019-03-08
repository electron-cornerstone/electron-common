"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
function promisify(fn) {
    return function () {
        return new Promise(function (resolve, reject) {
            fn.apply(void 0, arguments.concat([function () {
                    if (arguments[0] instanceof Error) {
                        reject(arguments[0]);
                    }
                    else {
                        resolve.apply(void 0, Array.prototype.slice.call(arguments, 1));
                    }
                }]));
        });
    };
}
exports["default"] = promisify;
exports.readFile = promisify(fs_1.readFile);
exports.writeFile = promisify(fs_1.writeFile);
