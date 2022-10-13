const exclusionList = require('./metro-config/src/defaults/exclusionList');
// you have to have this in case of JESTE config naming collision with aws amplify shit
module.exports = {
    resolver: {
        blacklistRE: exclusionList([/#current-cloud-backend\/.*/]),
    }
}
