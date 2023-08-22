const express = require("express");

const router = express.Router();

const ctrl = require('../../controlers/notices');

const { validateBody, autentificate } = require('../../middlevares');

const { noticeValidationSchema } = require('../../models/notice');

router.post('/add-notice', autentificate, validateBody(noticeValidationSchema), ctrl.addNotice);

router.get('/', ctrl.getNoticesByCategory);

module.exports = router;