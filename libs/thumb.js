const sharp = require('sharp');

module.exports = {
    sharp: function(img,w,h,thumb_img) {
        return sharp(img).resize(w,h).toFile(thumb_img,function(err) {
            if(err) {
                throw err;
            }
        });
    }
};