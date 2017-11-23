// fileload - by Manuel Di Iorio
const path = require("path");

module.exports = new class {
    root(path) {
        if (!path) throw new Error("missing path parameter");
        this.rootPath = path;
        return this;
    }

    file(absPath) {
        if (!this.rootPath) throw new Error("root path has not been defined");
        if (!absPath) throw new Error("missing path parameter");
        return require(path.join(this.rootPath, absPath));
    };

    resolve(absPath) {
        if (!this.rootPath) throw new Error("root path has not been defined");
        if (!absPath) throw new Error("missing path parameter");
        return path.join(this.rootPath, absPath);
    }
};
