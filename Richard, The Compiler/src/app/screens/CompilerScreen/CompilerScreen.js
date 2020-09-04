/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
// import * as CommandsCompiler from '../../helpers/commands';
import './styles.scss';

function CompilerScreen() {
  const headings = [
    'I',
    'Instrução',
    'Atributo #1',
    'Atributo #2',
    'Comentário',
  ];

  const [rows, setRows] = useState([]);

  function createNewVector(oldVector, newVector) {
    let aux = null;
    aux = oldVector.split(' ');
    aux.forEach((item) => {
      console.log(item);
      if (item.includes(',')) {
        console.log(item, newVector.concat(item.split(',')))
        newVector = newVector.concat(item.split(','));
      } else newVector.push(item);
    });
    return newVector;
  }

  function loadTable(reader) {
    const tableRows = [];
    reader.onload = async (e) => {
      const fileRows = e.target.result.split('\n');
      for (let i = 0; i < fileRows.length; i += 1) {
        if (fileRows[i].trim() !== '') {
          let newVector = [];
          const tableRowWithPadding = [];
          tableRowWithPadding[0] = i;

          if (fileRows[i].indexOf('//') > 0) {
            const dividedCommand = fileRows[i].split('//');
            const instruction = dividedCommand[0];
            [, tableRowWithPadding[4]] = dividedCommand;
            newVector = createNewVector(instruction, newVector);
          } else newVector = createNewVector(fileRows[i], newVector);
          console.log(newVector);
          const maxLimit = tableRowWithPadding[4] ? 2 : 1;
          for (let j = 0; j < headings.length - maxLimit; j += 1) {
            if (j > newVector.length) {
              tableRowWithPadding[j + 1] = '';
            } else tableRowWithPadding[j + 1] = newVector[j];
          }
          tableRows[i] = tableRowWithPadding;
        }
      }
      setRows(tableRows);
    };
  }

  async function handleFileSelector(event) {
    if (event.target.files[0].type === 'text/plain') {
      const reader = new FileReader();
      if (reader) {
        loadTable(reader);
        reader.readAsText(event.target.files[0]);
        event.target.value = '';
      }
    } else alert('Este tipo de arquivo não é suportado!');
  }

  function renderTableHeader() {
    return headings.map((element, index) => {
      return <th key={index}>{element}</th>;
    });
  }

  function renderRow(row, index) {
    return (
      <tr key={`row-${index}`}>
        {rows[index].map((cell, cellIndex) => {
          return <td key={cellIndex}>{rows[index][cellIndex]}</td>;
        })}
      </tr>
    );
  }

  function runCode() {
    rows.forEach((item, index) => {
      if (index === 0) console.log(item);
      // CommandsCompiler.commands(item[1]);
    });
  }

  return (
    <div className="panel">
      <div className="header-panel">
        <ul>
          <li>
            <input
              type="file"
              name="Arquivo"
              id="file-button"
              accept=".txt"
              onChange={handleFileSelector}
            />
            <label htmlFor="file-button">Arquivo</label>
          </li>
          <li>
            <button type="button" onClick={() => setRows([])}>
              Excluir
            </button>
          </li>
          <li>
            <button type="button" onClick={runCode}>
              Executar
            </button>
          </li>
          <li>
            <button type="button">Sobre</button>
          </li>
        </ul>
      </div>
      <div className="main-panel">
        <div className="table">
          <div className="area-content">
            {rows.length > 0 && (
              <table>
                <tbody>
                  <tr>{renderTableHeader()}</tr>
                  {rows.map(renderRow)}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="stack">
          <div className="area-content" />
        </div>
        <div className="input">
          <div className="area-content" />
        </div>
        <div className="output">
          <div className="area-content" />
        </div>
        <div className="breakpoint">
          <div className="area-content" />
        </div>
      </div>
      <div className="footer-panel" />
    </div>
  );
}

export default CompilerScreen;
