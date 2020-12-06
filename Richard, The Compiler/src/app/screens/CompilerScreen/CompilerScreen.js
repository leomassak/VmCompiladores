/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineArrowRight } from 'react-icons/ai';

import './styles.scss';
import { VmCommands } from '../../utils/consts/vmComands';
import { getRandomValue } from '../../utils/functions/ramdom';

function CompilerScreen() {
  const headings = [
    'I',
    'Instrução',
    'Atributo #1',
    'Atributo #2',
    'Comentário',
  ];

  const [rows, setRows] = useState([]);
  const [labels, setLabels] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [P, setP] = useState([]);
  const [M, setM] = useState([]);
  const [s, setS] = useState(0);
  const [i, setI] = useState(0);
  const [inputArray, setInputArray] = useState([]);
  const [outputArray, setOutputArray] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [stepArrow, setStepArrow] = useState(false);
  const [breakPoint, setBreakpoint] = useState(null);

  let iAux = 0;
  let sAux = 0;

  function secureSetM(value, sParam) {
    if (M.length <= sParam) M.push(value);
    else M[sParam] = value;
  }

  function incrementI() {
    iAux += 1;
  }

  function incrementS() {
    sAux += 1;
  }

  function decrementS() {
    sAux -= 1;
  }

  function getParam(command, param) {
    if (
      command === VmCommands.JMP ||
      command === VmCommands.JMPF ||
      command === VmCommands.CALL
    ) {
      return param;
    }
    return Number(param);
  }

  function clearVm() {
    setStepArrow(false);
    setM([]);
    setI(0);
    setS(0);
    setInputArray([]);
    setOutputArray([]);
    setBreakpoint(null);
    console.clear();
  }

  function execCommand(command) {
    if (stepArrow) {
      iAux = i;
      sAux = s;
    }

    const firstParam = rows[iAux][2] && getParam(command, rows[iAux][2]);
    const secondParam = rows[iAux][3] && getParam(command, rows[iAux][3]);

    switch (command) {
      case VmCommands.START:
        sAux = -1;
        incrementI();
        break;
      case VmCommands.LDC:
        incrementS();
        M[sAux] = firstParam;
        incrementI();
        break;
      case VmCommands.LDV:
        incrementS();
        M[sAux] = M[firstParam];
        incrementI();
        break;
      case VmCommands.ADD:
        M[sAux - 1] = M[sAux - 1] + M[sAux];
        decrementS();
        incrementI();
        break;
      case VmCommands.SUB:
        M[sAux - 1] = M[sAux - 1] - M[sAux];
        decrementS();
        incrementI();
        break;
      case VmCommands.MULT:
        M[sAux - 1] = M[sAux - 1] * M[sAux];
        decrementS();
        incrementI();
        break;
      case VmCommands.DIVI:
        M[sAux - 1] = M[sAux - 1] / M[sAux];
        decrementS();
        incrementI();
        break;
      case VmCommands.INV:
        M[sAux] = -M[sAux];
        incrementI();
        break;
      case VmCommands.AND:
        if (M[sAux - 1] === 1 && M[sAux] === 1) {
          M[sAux - 1] = 1;
        } else {
          M[sAux - 1] = 0;
        }
        decrementS();
        incrementI();
        break;
      case VmCommands.OR:
        if (M[sAux - 1] === 1 || M[sAux] === 1) {
          M[sAux - 1] = 1;
        } else {
          M[sAux - 1] = 0;
        }
        console.log('OR result', M[sAux - 1]);
        decrementS();
        incrementI();
        break;
      case VmCommands.NEG:
        M[sAux] = 1 - M[sAux];
        incrementI();
        break;
      case VmCommands.CME:
        if (M[sAux - 1] < M[sAux]) {
          M[sAux - 1] = 1;
        } else {
          M[sAux - 1] = 0;
        }
        decrementS();
        incrementI();
        break;
      case VmCommands.CMA:
        if (M[sAux - 1] > M[sAux]) {
          M[sAux - 1] = 1;
        } else {
          M[sAux - 1] = 0;
        }
        decrementS();
        incrementI();
        break;
      case VmCommands.CEQ:
        if (M[sAux - 1] === M[sAux]) {
          M[sAux - 1] = 1;
        } else {
          M[sAux - 1] = 0;
        }
        decrementS();
        incrementI();
        break;
      case VmCommands.CDIF:
        if (M[sAux - 1] !== M[sAux]) {
          M[sAux - 1] = 1;
        } else {
          M[sAux - 1] = 0;
        }
        decrementS();
        incrementI();
        break;
      case VmCommands.CMEQ:
        if (M[sAux - 1] <= M[sAux]) {
          M[sAux - 1] = 1;
        } else {
          M[sAux - 1] = 0;
        }
        decrementS();
        incrementI();
        break;
      case VmCommands.CMAQ:
        if (M[sAux - 1] >= M[sAux]) {
          M[sAux - 1] = 1;
        } else {
          M[sAux - 1] = 0;
        }
        decrementS();
        incrementI();
        break;
      case VmCommands.HLT:
        setStepArrow(false);
        break;
      case VmCommands.STR:
        M[firstParam] = M[sAux];
        decrementS();
        incrementI();
        break;
      case VmCommands.JMP:
        iAux = firstParam;
        break;
      case VmCommands.JMPF:

        if (M[sAux] === 0) {
          iAux = firstParam;
        } else {
          incrementI();
        }
        decrementS();
        break;
      case VmCommands.NULL:
        incrementI();
        break;
      case VmCommands.RD:
        incrementS();
        setShowPrompt(true);
        incrementI();
        break;
      case VmCommands.PRN:
        outputArray.push(M[sAux]);
        decrementS();
        incrementI();
        break;
      case VmCommands.ALLOC:
        for (let k = 0; k < secondParam; k += 1) {
          incrementS();
          if (M.length <= firstParam + k)
            secureSetM(Math.round(getRandomValue()), firstParam + k, M);
          else secureSetM(M[firstParam + k], sAux, M);
        }
        incrementI();
        break;
      case VmCommands.DALLOC:
        for (let k = secondParam - 1; k >= 0; k -= 1) {
          M[firstParam + k] = M[sAux];
          decrementS();
        }
        incrementI();
        break;
      case VmCommands.CALL:
        incrementS();
        M[sAux] = iAux + 1;
        iAux = firstParam;
        break;
      case VmCommands.RETURN:
        iAux = M[sAux];
        decrementS();
        break;
      default:
        console.log(P[iAux], 'é um comando inválido');
        return false;
    }
  }

  function runVm() {
    while (
      (iAux <= P.length &&
        P[iAux] !== VmCommands.HLT &&
        P[iAux] !== VmCommands.RD) ||
      (breakPoint && breakPoint === iAux + 1)
    ) {
      execCommand(P[iAux]);
      setI(iAux);
      setS(sAux);
    }
    console.log('parei');

    if (breakPoint) {
      setStepArrow(true);
      setI(breakPoint);
    }

    if (!breakPoint && !stepArrow && P[iAux] === VmCommands.RD) {
      setShowPrompt(true);
    }
  }

  function clearStates() {
    setRows([]);
    setLabels([]);
    setP([]);
    clearVm();
  }

  function runStepByStep() {
    if (stepArrow) {
      if (i < P.length) {
        console.log('s, i, P', s, i, P[i], P);
        execCommand(P[i]);
        console.log('iAux, sAux', iAux, sAux);
        setI(iAux);
        setS(sAux);
      } else {
        console.log('aacabo');
        clearVm();
      }
    }
  }

  function toggleBreakpoint(value) {
    console.log('breakPoint', value);
    if (value === breakPoint) {
      setBreakpoint(null);
    } else {
      setBreakpoint(value);
    }
  }

  function getLabelIndex(label) {
    let labelIndex = null;
    labels.forEach((item) => {
      if (item.label.trim() === label.trim()) {
        labelIndex = item.index;
      }
    });
    return labelIndex;
  }

  function transformLabelsInIndex(table) {
    table.forEach((item, index) => {
      if (
        item[1] === VmCommands.JMP ||
        item[1] === VmCommands.JMPF ||
        item[1] === VmCommands.CALL
      ) {
        const labelIndex = getLabelIndex(item[2]);
        item[2] = labelIndex;
      }
    });
  }

  function createNewVector(oldVector, newVector) {
    let aux = null;
    aux = oldVector.split(' ');
    aux.forEach((item) => {
      if (item.includes(',')) {
        newVector = newVector.concat(item.split(','));
      } else newVector.push(item);
    });
    return newVector;
  }

  function loadTable(reader) {
    const tableRows = [];
    reader.onload = async (e) => {
      const fileRows = e.target.result.split('\n');
      for (let iTable = 0; iTable < fileRows.length; iTable += 1) {
        if (fileRows[iTable].trim() !== '') {
          let newVector = [];
          const tableRowWithPadding = [];
          tableRowWithPadding[0] = iTable;

          newVector = createNewVector(fileRows[iTable], newVector);

          for (let j = 0; j < headings.length - 1; j += 1) {
            if (j > newVector.length) {
              tableRowWithPadding[j + 1] = '';
            } else tableRowWithPadding[j + 1] = newVector[j];
          }

          if (tableRowWithPadding[2]?.trim() === VmCommands.NULL) {
            tableRowWithPadding[2] = '';
            tableRowWithPadding[headings.length - 1] = tableRowWithPadding[1];
            labels.push({ label: tableRowWithPadding[1], index: iTable });
            tableRowWithPadding[1] = VmCommands.NULL;
          }

          tableRows[iTable] = tableRowWithPadding;
          P.push(tableRowWithPadding[1].trim());
        }
      }
      transformLabelsInIndex(tableRows);
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

  function runCode() {
    runVm();
  }

  function readUserInput() {
    inputArray.push(Number(userInput));
    if (!stepArrow) {
      console.log('s, i, P', s, i, P);
      sAux = s + 1;
      iAux = i + 1;
      console.log('iAux, sAux', iAux, sAux);
      M[sAux] = Number(userInput);
    } else {
      M[s] = Number(userInput);
    }
    setShowPrompt(false);
    setUserInput('');
    if (!stepArrow) {
      console.log('to em exec');
      setTimeout(() => runVm(), 300);
    }
  }

  function handleStepByStep() {
    if (rows?.length > 0) {
      setStepArrow(true);
    }
  }

  return (
    <div className="panel">
      <Modal
        isOpen={showPrompt}
        contentLabel="Example Modal"
        className="input-modal"
        overlayClassName="modal-overlay"
      >
        <div className="prompt">
          <h2>Digite um valor</h2>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="button" onClick={() => readUserInput()}>
            Confirmar
          </button>
        </div>
      </Modal>
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
            <button type="button" onClick={clearStates}>
              Excluir
            </button>
          </li>
          <li>
            <button type="button" onClick={runCode}>
              Executar
            </button>
          </li>
          <li>
            <button type="button" onClick={handleStepByStep}>
              Passo a Passo
            </button>
          </li>
          <li>
            <button type="button">Sobre</button>
          </li>
        </ul>
      </div>
      <div className="main-panel">
        {stepArrow && !showPrompt && (
          <div className="step-container">
            <span onClick={clearVm}>X</span>
            <span onClick={runStepByStep}>
              <AiOutlineArrowRight fontSize={14} />
            </span>
          </div>
        )}
        <div className="table">
          <div className="area-content">
            {rows.length > 0 && (
              <table>
                <tbody>
                  <tr>{renderTableHeader()}</tr>
                  {rows.map((row, index) => (
                    <tr
                      key={`row-${index}`}
                      onClick={() => toggleBreakpoint(index)}
                      className="table-row"
                    >
                      {rows[index].map((cell, cellIndex) => {
                        return (
                          <td key={cellIndex}>
                            {cellIndex === 0 && index === i && stepArrow && (
                              <AiOutlineArrowRight className="debug-icon" />
                            )}
                            {cellIndex === 0 && breakPoint === index && (
                              <div className="breakpoint-circle" />
                            )}
                            {rows[index][cellIndex]}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="stack">
          <div className="display-header">Conteúdo da pilha</div>
          {M?.length > 0 && (
            <table>
              <tbody className="stack-table">
                <tr>
                  <th>Endereço(s)</th>
                  <th>Valor</th>
                </tr>
                {M?.map((item, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="input">
          <div className="display-header">Janela de Entrada</div>
          <div className="area-content">
            {inputArray?.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
        <div className="output">
          <div className="display-header">Janela de Saída</div>
          <div className="area-content">
            {outputArray?.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
        <div className="breakpoint">
          <div className="display-header">Break Points</div>
          <div className="area-content" />
        </div>
      </div>
      <div className="footer-panel" />
    </div>
  );
}

export default CompilerScreen;
