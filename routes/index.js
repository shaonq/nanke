var express = require('express');
var router = express.Router();
/*upload*/
var multipart = require('connect-multiparty');
router.use(multipart({ uploadDir: './public/uploads/' }));//跨磁盘
var multipartMiddleware = multipart();
/* models */
var index = require("../models/index");
router.get('/', index.index);
router.get('/demo', index.demo);
router.get('/chat',index.chat);
router.get('/nodejs',index.nodejs);
router.get('/date/json',index.dateJson);
router.get('/date',index.date);
router.get('/search', index.search);
router.get('/nk', index.nk);

router.post('/search/json',index.searchJson);
router.post("/upload",multipartMiddleware, index.upload);

module.exports = router;
