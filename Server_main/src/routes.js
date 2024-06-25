const express = require('express');
const { getRows, addData, addRow, addCol, deleteCell, undoCell, delCol, delRow } = require('./controllers');

const router = express.Router();

router.get('/data', getRows);
router.post('/data', addData);
router.post('/addrow', addRow);
router.post('/addcol', addCol);
router.post('/delete', deleteCell);
router.post('/undo', undoCell);
router.post('/delCol', delCol);
router.post('/delRow', delRow);

module.exports = router;
 