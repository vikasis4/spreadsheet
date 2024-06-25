/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [numRows, setNumRows] = useState(0);
  const [numCols, setNumCols] = useState(0);
  var selected = useRef({ row: 0, col: 0, data: "" }).current;
  var copyData = useRef('').current;
  var history = useRef([]).current;
  var redo = useRef([]).current;


  const setSel = (val) => {
    selected = val;
  }

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    const response = await axios.get('http://localhost:9000/api/data');

    var rowLength = 0;
    var colLength = 0;

    response.data.forEach((element, index) => {
      if (element.num > rowLength) {
        rowLength = element.num
      }
      response.data[index].column.forEach((element) => {
        if (element.num > colLength) {
          colLength = element.num
        }
      })
    });
    setNumCols(colLength)
    setNumRows(rowLength)

    var newArr = []

    // Creating Empty SpreadSheet
    for (let row = 0; row < rowLength; row++) {
      newArr.push({ id: row, column: [], num: row })
      for (let cell = 0; cell < colLength; cell++) {
        newArr[row].column.push({ num: cell, data: '' })
      }
    }

    // Filling The SpreadSheet
    response.data.forEach((element, index) => {
      element.column.forEach(data => {
        newArr[element.num - 1].column[data.num - 1].data = data.data
      })
    })
    setData(newArr);
  };

  ///////////////////////////// UPDATE FUNCTION ////////////////////////
  const updateData = (obj) => {
    var newArray = [...data]
    newArray[obj.row - 1].column[obj.col - 1].data = obj.data;
    setData(newArray)
  }
  ///////////////////////////// UPDATE FUNCTION ////////////////////////
  const addRowFxn = async () => {
    await axios.post('http://localhost:9000/api/addRow', {
      numRows
    }).then((res) => {
      window.location.reload()
    })
  }
  const addColFxn = async () => {
    await axios.post('http://localhost:9000/api/addCol', {
      numRows, numCols
    }).then((res) => {
      window.location.reload()
    })
  }
  const deleteColFxn = async () => {
    await axios.post('http://localhost:9000/api/delCol', {
      numRows, numCols
    }).then((res) => {
      window.location.reload()
    })
  }
  const deleteRowFxn = async () => {
    await axios.post('http://localhost:9000/api/delRow', {
      numRows
    }).then((res) => {
      window.location.reload()
    })
  }

  const handleDelete = async () => {
    await axios.post('http://localhost:9000/api/delete', { selected }).then((res) => {
      window.location.reload()
    })
  }
  const handleUndo = async () => {
    if (history.length > 0) {
      redo.push(history[history.length - 1])
      await axios.post('http://localhost:9000/api/undo', { data: history[history.length - 2] }).then((res) => {
        updateData(history[history.length - 2])
        history.pop();
        history.pop();
      })
    }
  }
  const handleRedo = async () => {
    if (redo.length > 0) {
      await axios.post('http://localhost:9000/api/undo', { data: redo[redo.length - 1] }).then((res) => {
        updateData(redo[redo.length - 1])
        redo.pop()
      })
    }
  }
  const handleCopy = () => {
    copyData = selected.data
  }
  const handlePaste = () => {
    selected.data = copyData
    var newObj = { ...selected }
    updateData(newObj)
  }
  console.log('redner');
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'z') {
        handleUndo();
      } else if (e.ctrlKey && e.key === 'y') {
        handleRedo();
      } else if (e.ctrlKey && e.key === 'c') {
        handleCopy();
      } else if (e.ctrlKey && e.key === 'v') {
        handlePaste();
      } else if (e.key === 'Delete') {
        handleDelete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDelete, handleUndo, handleRedo, handleCopy, handlePaste]);

  var btnClass = 'hover:cursor-pointer m-4 px-2 py-1 bg-blue-500 text-center rounded-md shadow-md text-white'
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-100"></th>
            {Array.from({ length: numCols }).map((_, index) => (
              <th key={index} className="py-2 px-4 bg-pink-600 text-white">C{index + 1}</th>
            ))}
            <h1 onClick={addColFxn} className={btnClass}>Add Column</h1>
            <h1 onClick={deleteColFxn} className={btnClass}>Delete Column</h1>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (<RowRender key={Math.random() * 100000} history={history} setSel={setSel} row={row.column} index={index} />))}
          <h1 onClick={addRowFxn} className={btnClass}>Add Row</h1>
          <h1 onClick={deleteRowFxn} className={btnClass}>Delete Row</h1>
        </tbody>
      </table>
    </div>
  );
};

function RowRender({ row, index, setSel, history }) {
  return (
    <tr>
      <td key={index} className="py-2 px-4 bg-pink-600 text-center text-white">R{index + 1}</td>
      {row.map((data) => <CellRender key={Math.random() * 100000} history={history} setSel={setSel} row={data} index={index} />)}
    </tr>

  )
}

function CellRender({ row, index, setSel, history }) {

  const [state, setState] = React.useState(row.data);

  const handlechange = async (e) => {
    setState(e.target.value)
    history.push({ col: row.num + 1, row: index + 1, data: state });
    history.push({ col: row.num + 1, row: index + 1, data: e.target.value });
    await axios.post('http://localhost:9000/api/data', { row: index, col: row.num, data: e.target.value });
  }

  return (
    <td key={index} className="border px-4 py-2">
      <input
        type="text"
        value={state}
        onChange={handlechange}
        onClick={() => { setSel({ col: row.num + 1, row: index + 1, data: state }) }}
      />
    </td>
  )
}

export default App;
