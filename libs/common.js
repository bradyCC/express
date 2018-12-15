const crypto = require('crypto');

module.exports = {
    MD5_SUFFIX: 'ASDFGHJKLasdfghjkl',           //后缀
    md5: function(str) {
        const hash = crypto.createHash('md5');  //md5方式
        hash.update(str);                       //传入数据
        return hash.digest('hex');              //返回哈希值
    }
};
