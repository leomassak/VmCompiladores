/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import * as CommandsCompiler from '../../helpers/comands';
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

  function handleFileSelector(event) {
    const tableRows = [];
    const reader = new FileReader();
    if (reader) {
      reader.onload = async (e) => {
        const fileRows = e.target.result.split('\n');
        for (let i = 0; i < fileRows.length; i += 1) {
          if (fileRows[i].trim() !== '') {
            const rowValues = fileRows[i].split(' ');
            const tableRowWithPadding = [];
            for (let j = 0; j < headings.length; j += 1) {
              if (j > rowValues.length) {
                tableRowWithPadding[j] = '';
              } else {
                tableRowWithPadding[j] = rowValues[j];
              }
            }
            tableRows[i] = tableRowWithPadding;
          }
        }
        setRows(tableRows);
      };
      reader.readAsText(event.target.files[0]);
      event.target.value = '';
    }
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
      if (index === 1) console.log(item)
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
