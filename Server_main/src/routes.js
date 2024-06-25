const express = require('express');
const { getRows, addData, addRow, addCol } = require('./controllers');

const router = express.Router();

router.get('/data', getRows);
router.post('/data', addData);
router.post('/addrow', addRow);
router.post('/addcol', addCol);

module.exports = router;
 