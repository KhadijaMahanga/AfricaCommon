# fileload
Require absolute paths relative to the provided root folder.

Useful for large projects which need to avoid relative paths to better maintain the project structure

## Example
```javascript
const load = require("fileload").root(__dirname);
load.file("path/to/some/file");
```

This will require the module resolved from the root, by internally doing `path.join(__dirname, "path/to/some/file")`


## Install with

```
npm i fileload
```


## FAQ

#### Can I still require npm modules if I use this lib ?

Of course, by normally using `require()`

#### Can I dinamically change the root path ?

You can with `load.root(newRootPath)` but note that this is a global per-process setting, so the `load.file()` calls order is important

#### What makes this lib different from similar modules ?

When you require _'fileload'_ the first time, an instance of the module is automatically created and cached by Node, so that the root path will be stored in your entire Node process.

This means that you can require _'fileload'_ multiple times without the need to set the root path each time, or passing the module variable around. Convenient!

## LICENSE

[The Unlicensed](http://unlicense.org)
