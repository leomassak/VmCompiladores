/* eslint-disable no-alert */
import React, { useContext, createContext, useState } from 'react';
import { VmCommands } from '../utils/consts/vmComands';
import { getRandomValue } from '../utils/functions/ramdom';

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

  function secureSetM(value, sParam, arrayM) {
    if (M.length <= sParam) M.push(value);
    else M[sParam] = value;
  }

  function incrementI() {
    iAux += 1;
  }

  function incrementS() {
    sAux += 1;
  }

  function decrementI() {
    iAux -= 1;
  }

  function decrementS() {
    sAux -= 1;
  }

  function clearI() {
    iAux = 0;
  }

  function clearS() {
    sAux = 0;
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
    clearI();
    clearS();
    setP([]);
    setM([]);
    setI(0);
    setS(0);
    setInputArray([]);
    setOutputArray([]);
  }

  function runVm(rows) {
    let userInput;
    let stopVm = false;

    while (iAux <= P.length && !stopVm) {
      const firstParam = rows[iAux][2] && getParam(P[iAux], rows[iAux][2]);
      const secondParam = rows[iAux][3] && getParam(P[iAux], rows[iAux][3]);

      switch (P[iAux]) {
        case VmCommands.START:
          console.log('iniciar programa principal', sAux, iAux, M);
          sAux = -1;
          incrementI();
          break;
        case VmCommands.LDC:
          console.log('carregar constante', firstParam, sAux, iAux, M);
          incrementS();
          M[sAux] = firstParam;
          incrementI();
          break;
        case VmCommands.LDV:
          console.log('carregar valor', firstParam, sAux, iAux, M);
          incrementS();
          M[sAux] = M[firstParam];
          incrementI();
          break;
        case VmCommands.ADD:
          console.log('somar', sAux, iAux, M);
          M[sAux - 1] = M[sAux - 1] + M[sAux];
          console.log('ADD result', M[sAux - 1]);
          decrementS();
          incrementI();
          break;
        case VmCommands.SUB:
          console.log('subtrair', sAux, iAux, M);
          M[sAux - 1] = M[sAux - 1] - M[sAux];
          console.log('SUB result', M[sAux - 1]);
          decrementS();
          incrementI();
          break;
        case VmCommands.MULT:
          console.log('multiplicar', sAux, iAux, M);
          M[sAux - 1] = M[sAux - 1] * M[sAux];
          console.log('MULT result', M[sAux - 1]);
          decrementS();
          incrementI();
          break;
        case VmCommands.DIVI:
          console.log('dividir', sAux, iAux, M);
          M[sAux - 1] = M[sAux - 1] / M[sAux];
          console.log('DIV result', M[sAux - 1]);
          decrementS();
          incrementI();
          break;
        case VmCommands.INV:
          console.log('inverte o sinal', sAux, iAux, M);
          M[sAux] = -M[sAux];
          console.log('INV result', M[sAux]);
          incrementI();
          break;
        case VmCommands.AND:
          console.log('conjunção', sAux, iAux, M);
          if (M[sAux - 1] === 1 && M[sAux] === 1) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          console.log('AND result', M[sAux - 1]);
          decrementS();
          incrementI();
          break;
        case VmCommands.OR:
          console.log('disjunção', sAux, iAux, M);
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
          console.log('negação', sAux, iAux, M);
          M[sAux] = 1 - M[sAux];
          console.log('NEG result', M[sAux]);
          incrementI();
          break;
        case VmCommands.CME:
          console.log('comparar menor', sAux, iAux, M);
          if (M[sAux - 1] < M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          console.log('CME result', M[sAux - 1]);
          decrementS();
          incrementI();
          break;
        case VmCommands.CMA:
          console.log('comparar maior', sAux, iAux, M);
          if (M[sAux - 1] > M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          console.log('CMA result', M[sAux - 1]);
          decrementS();
          incrementI();
          break;
        case VmCommands.CEQ:
          console.log('comparar igual', sAux, iAux, M);
          if (M[sAux - 1] === M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          console.log('CEQ result', M[sAux - 1]);
          decrementS();
          incrementI();
          break;
        case VmCommands.CDIF:
          console.log('comparar desigual', sAux, iAux, M);
          if (M[sAux - 1] !== M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          console.log('CDIF result', M[sAux - 1]);
          decrementS();
          incrementI();
          break;
        case VmCommands.CMEQ:
          console.log('comparar menor ou igual', sAux, iAux, M);
          if (M[sAux - 1] <= M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          console.log('CMEQ result', M[sAux - 1]);
          decrementS();
          incrementI();
          break;
        case VmCommands.CMAQ:
          console.log('comparar maior ou igual', sAux, iAux, M);
          if (M[sAux - 1] >= M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          console.log('CMAQ result', M[sAux - 1]);
          decrementS();
          incrementI();
          break;
        case VmCommands.HLT:
          console.log('parar');
          stopVm = true;
          incrementI();
          break;
        case VmCommands.STR:
          console.log('armazenar valor', firstParam, sAux, iAux, M);
          M[firstParam] = M[sAux];
          console.log('STR result', M[firstParam]);
          decrementS();
          incrementI();
          break;
        case VmCommands.JMP:
          console.log('param', firstParam, sAux, iAux, M);
          iAux = firstParam;
          console.log('JMP i value', iAux);
          break;
        case VmCommands.JMPF:
          console.log('param', firstParam, sAux, iAux, M);
          console.log('desviar se falso');

          if (M[sAux] === 0) {
            iAux = firstParam;
          } else {
            incrementI();
          }
          decrementS();
          console.log('JMPF i value', iAux);
          break;
        case VmCommands.NULL:
          console.log('nada');
          incrementI();
          break;
        case VmCommands.RD:
          console.log('leitura', sAux, iAux, M);
          incrementS();
          userInput = 2;
          inputArray.push(userInput);
          M[sAux] = userInput;
          console.log('RD result', M[sAux]);
          incrementI();
          break;
        case VmCommands.PRN:
          console.log('impressão', sAux, iAux, M);
          outputArray.push(M[sAux]);
          decrementS();
          incrementI();
          break;
        case VmCommands.ALLOC:
          console.log('alocar memoria', sAux, iAux, M);
          console.log('params', firstParam, secondParam);
          for (let k = 0; k < secondParam; k += 1) {
            console.log('k', k);
            incrementS();
            if (M.length <= firstParam + k)
              secureSetM(getRandomValue(), firstParam + k, M);
            else secureSetM(M[firstParam + k], sAux, M);
            console.log('alocação', M[sAux]);
          }
          incrementI();
          break;
        case VmCommands.DALLOC:
          console.log('desalocar memoria', sAux, iAux, M);
          for (let k = secondParam - 1; k >= 0; k -= 1) {
            M[firstParam + k] = M[sAux];
            console.log('desalocação', M[sAux], M[firstParam + k]);
            decrementS();
          }
          incrementI();
          break;
        case VmCommands.CALL:
          console.log('chamar procedimento ou função', firstParam, sAux, iAux, M);
          incrementS();
          M[sAux] = iAux + 1;
          iAux = firstParam;
          console.log('CALL result', iAux, M[sAux]);
          break;
        case VmCommands.RETURN:
          console.log('retornar de procedimento', sAux, iAux, M);
          iAux = M[sAux];
          decrementS();
          console.log('RETURN result', iAux);
          break;
        default:
          console.log(P[iAux], 'é um comando inválido');
          stopVm = true;
          break;
      }
      setI(iAux);
      setS(sAux);
    }
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
        clearVm,
        setP,
        setM,
        setI,
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
