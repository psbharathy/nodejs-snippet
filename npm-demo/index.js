var _ = require("underscore");
// rquires looks for three level
//
// Core Module
// file or folder (./underscore)
// node_modules
// SemanticVersion SemVer
// "^5.2.9" => Major.Minor.Patch
// 5.x => Major is
// ~5. => interested in 1.8.x
var result = _.contains([1, 2, 3], 3);
console.log(result);
