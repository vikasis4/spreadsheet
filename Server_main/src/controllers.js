const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getRows = async (req, res) => {
  try {
    const rows = await prisma.row.findMany({
      include: {
        column: true
      }
    });
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const addData = async (req, res) => {
  try {
    var rowNum = req.body.row + 1;
    var colNum = req.body.col + 1;

    const data = await prisma.row.findFirst({
      where: {
        num: rowNum
      },
      include: {
        column: true
      }
    })
    if (data) {
      var colData = await prisma.col.findMany({ where: { rowId: data.rowId, num: colNum } })
      if (colData.length == 0) {
        await prisma.col.create({
          data: {
            num: colNum,
            data: req.body.data,
            rowId: data.rowId
          }
        })
      } else {
        await prisma.col.updateMany({
          where: {
            rowId: data.rowId,
            num: colNum
          },
          data: {
            data: req.body.data
          }
        })
      }

    } else {

      const newRow = await prisma.row.create({
        data: {
          num: rowNum
        }
      });
      await prisma.col.create({
        data: {
          num: colNum,
          data: req.body.data,
          rowId: newRow.rowId
        }
      })

    }
    res.json({ status: true });
  } catch (error) {
    console.log(error);
    res.status(200).json({ error: error.message });
  }
};

const addCol = async (req, res) => {
  try {
    var data = await prisma.row.findFirst({
      where: {
        num: req.body.numRows
      }
    })
    await prisma.col.create({
      data: {
        data: '',
        num: req.body.numCols + 1,
        rowId: data.rowId
      }
    })
    res.json({ status: true })
  } catch (error) {
    console.log(error);
    res.json({ status: false })
  }
}
const delCol = async (req, res) => {
  try {
    await prisma.col.deleteMany({
      where: {
        num: req.body.numCols,
      }
    })
    res.json({ status: true })
  } catch (error) {
    console.log(error);
    res.json({ status: false })
  }
}
const addRow = async (req, res) => {
  try {
    await prisma.row.create({
      data: {
        num: req.body.numRows + 1
      }
    })
    res.json({ status: true })
  } catch (error) {
    console.log(error);
    res.json({ status: false })
  }
}
const delRow = async (req, res) => {
  try {
    await prisma.row.delete({
      where: {
        num: req.body.numRows
      }
    })
    res.json({ status: true })
  } catch (error) {
    console.log(error);
    res.json({ status: false })
  }
}


const deleteCell = async (req, res) => {
  try {
    var row = await prisma.row.findFirst({
      where: {
        num: req.body.selected.row
      }
    })
    await prisma.col.updateMany({
      where: {
        num: req.body.selected.col,
        rowId: row.rowId
      },
      data: {
        data: ''
      }
    })
    res.json({ status: true })
  } catch (error) {
    console.log(error);
    res.json({ status: false })
  }
}
const undoCell = async (req, res) => {
  try {
    var row = await prisma.row.findFirst({
      where: {
        num: req.body.data.row
      }
    })
    await prisma.col.updateMany({
      where: {
        num: req.body.data.col,
        rowId: row.rowId
      },
      data: {
        data: req.body.data.data
      }
    })
    res.json({ status: true })
  } catch (error) {
    console.log(error);
    res.json({ status: false })
  }
}

module.exports = { getRows, addData, addCol, addRow, deleteCell, undoCell, delRow, delCol };