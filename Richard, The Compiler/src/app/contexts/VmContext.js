/* eslint-disable no-alert */
import React, { useContext, createContext, useState } from 'react';
import { VmCommands } from '../utils/consts/vmComands';

const Context = createContext();

function VmContext({ children }) {
  const [P, setP] = useState([]);
  const [M, setM] = useState([]);
  const [i, setI] = useState(0);
  const [s, setS] = useState(0);
  const [inputArray, setInputArray] = useState([]);
  const [outputArray, setOutputArray] = useState([]);

  let iAux = 0;
  let sAux = 0;

  function incrementI() {
    iAux += 1;
  }

  function incrementS() {
    sAux += 1;
  }

  function decrementI() {
    if (iAux > 0) {
      iAux -= 1;
    }
  }

  function decrementS() {
    if (sAux > 0) {
      sAux -= 1;
    }
  }

  function clearI() {
    iAux = 0;
  }

  function clearS() {
    sAux = 0;
  }

  function getParam(command, param) {
    if (command === VmCommands.JMP || command === VmCommands.JMPF) {
      return param;
    }
    return Number(param);
  }

  function runVm(rows) {
    let userInput;
    rows.forEach((item, index) => {
      // console.log('row / s / M', item);

      const firstParam = item[2] && getParam(item[1], item[2]);
      const secondParam = item[3] && getParam(item[1], item[3]);

      const command = item[1].toString();
      console.log('teste', VmCommands[command], command);
      switch (command) {
        case VmCommands.START:
          console.log('iniciar programa principal');
          sAux = -1;
          break;
        case VmCommands.LDC:
          console.log('carregar constante');
          incrementS();
          M[sAux] = firstParam;
          break;
        case VmCommands.LDV:
          console.log('carregar valor');
          incrementS();
          M[sAux] = M[firstParam];
          break;
        case VmCommands.ADD:
          console.log('somar');
          M[sAux - 1] = M[sAux - 1] + M[sAux];
          decrementS();
          break;
        case VmCommands.SUB:
          console.log('subtrair');
          M[sAux - 1] = M[sAux - 1] - M[sAux];
          decrementS();
          break;
        case VmCommands.MULT:
          console.log('multiplicar');
          M[sAux - 1] = M[sAux - 1] * M[sAux];
          decrementS();
          break;
        case VmCommands.DIVI:
          console.log('dividir');
          M[sAux - 1] = M[sAux - 1] / M[sAux];
          decrementS();
          break;
        case VmCommands.INV:
          console.log('inverte o sinal');
          M[sAux] = -M[sAux];
          break;
        case VmCommands.AND:
          console.log('conjunção');
          if (M[sAux - 1] === 1 && M[sAux] === 1) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.OR:
          console.log('disjunção');
          if (M[sAux - 1] === 1 || M[sAux] === 1) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.NEG:
          console.log('negação');
          M[sAux] = 1 - M[sAux];
          break;
        case VmCommands.CME:
          console.log('comparar menor');
          if (M[sAux - 1] < M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.CMA:
          console.log('comparar maior');
          if (M[sAux - 1] > M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.CEQ:
          console.log('comparar igual');
          if (M[sAux - 1] === M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.CDIF:
          console.log('comparar desigual');
          if (M[sAux - 1] !== M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.CMEQ:
          console.log('comparar menor ou igual');
          if (M[sAux - 1] <= M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.CMAQ:
          console.log('comparar maior ou igual');
          if (M[sAux - 1] >= M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.HLT:
          console.log('parar');
          break;
        case VmCommands.STR:
          console.log('armazenar valor');
          M[firstParam] = M[sAux];
          decrementS();
          break;
        case VmCommands.JMP:
          console.log('desviar sempre');
          iAux = firstParam;
          break;
        case VmCommands.JMPF:
          console.log('desviar se falso');
          if (M[sAux] === 0) {
            iAux = firstParam;
          } else {
            iAux += 1;
          }
          break;
        case VmCommands.NULL:
          console.log('nada');
          break;
        case VmCommands.RD:
          console.log('leitura');
          incrementS();
          userInput = prompt(`Valor de entrada para M[${sAux}]`);
          setInputArray([...inputArray, userInput]);
          M[sAux] = userInput;
          break;
        case VmCommands.PRN:
          console.log('impressão');
          setOutputArray([...outputArray, M[sAux]]);
          break;
        case VmCommands.ALLOC:
          console.log('alocar memoria');
          if (firstParam && secondParam) {
            for (let k = 0; k < secondParam - 1; k += 1) {
              incrementS();
              M[sAux] = M[firstParam + k];
            }
          }
          break;
        case VmCommands.DALLOC:
          console.log('desalocar memoria');
          if (firstParam && secondParam) {
            for (let k = secondParam - 1; k === 0; k -= 1) {
              M[firstParam + k] = M[sAux];
              decrementS();
            }
          }
          break;
        case VmCommands.CALL:
          console.log('chamar procedimento ou função');
          incrementS();
          M[sAux] = iAux + 1;
          iAux = firstParam;
          break;
        case VmCommands.RETURN:
          console.log('retornar de procedimento');
          iAux = M[sAux];
          decrementS();
          break;
        default:
          console.log(command, 'é um comando inválido');
          break;
      }
      setS(sAux);
      setI(iAux);
    });
  }

  return (
    <Context.Provider
      value={{
        P,
        M,
        i,
        s,
        inputArray,
        outputArray,
        incrementI,
        incrementS,
        decrementI,
        decrementS,
        clearI,
        clearS,
        runVm,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useVmContext() {
  const context = useContext(Context);
  return context;
}

export default VmContext;
