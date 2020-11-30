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
    if (
      command === VmCommands.JMP ||
      command === VmCommands.JMPF ||
      command === VmCommands.CALL
    ) {
      return param;
    }
    return Number(param);
  }

  function runVm(rows) {
    let userInput;
    let stopVm = false;

    while (iAux <= P.length && !stopVm) {
      const firstParam = rows[iAux][2] && getParam(P[iAux], rows[iAux][2]);
      const secondParam = rows[iAux][3] && getParam(P[iAux], rows[iAux][3]);
      // console.log('params', firstParam, secondParam);
      // console.log('i', iAux);
      // console.log('lenght', P.length);
      // console.log('P[iAux]', P[iAux]);
      // console.log(P[iAux] === VmCommands.START);
      // incrementI();

      switch (P[iAux]) {
        case VmCommands.START:
          console.log('iniciar programa principal');
          sAux = -1;
          incrementI();
          break;
        case VmCommands.LDC:
          console.log('carregar constante', firstParam);
          incrementS();
          M[sAux] = firstParam;
          incrementI();
          break;
        case VmCommands.LDV:
          console.log('carregar valor', firstParam);
          incrementS();
          M[sAux] = M[firstParam];
          incrementI();
          break;
        case VmCommands.ADD:
          console.log('somar', M[sAux - 1], M[sAux]);
          M[sAux - 1] = M[sAux - 1] + M[sAux];
          decrementS();
          incrementI();
          break;
        case VmCommands.SUB:
          console.log('subtrair', M[sAux - 1], M[sAux]);
          M[sAux - 1] = M[sAux - 1] - M[sAux];
          decrementS();
          incrementI();
          break;
        case VmCommands.MULT:
          console.log('multiplicar', M[sAux - 1], M[sAux]);
          M[sAux - 1] = M[sAux - 1] * M[sAux];
          decrementS();
          incrementI();
          break;
        case VmCommands.DIVI:
          console.log('dividir', M[sAux - 1], M[sAux]);
          M[sAux - 1] = M[sAux - 1] / M[sAux];
          decrementS();
          incrementI();
          break;
        case VmCommands.INV:
          console.log('inverte o sinal', M[sAux]);
          M[sAux] = -M[sAux];
          incrementI();
          break;
        case VmCommands.AND:
          console.log('conjunção', M[sAux - 1], M[sAux]);
          if (M[sAux - 1] === 1 && M[sAux] === 1) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          incrementI();
          break;
        case VmCommands.OR:
          console.log('disjunção', M[sAux - 1], M[sAux]);
          if (M[sAux - 1] === 1 || M[sAux] === 1) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          incrementI();
          break;
        case VmCommands.NEG:
          console.log('negação', 1 - M[sAux]);
          M[sAux] = 1 - M[sAux];
          incrementI();
          break;
        case VmCommands.CME:
          console.log('comparar menor', 1 - M[sAux - 1]);
          if (M[sAux - 1] < M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          incrementI();
          break;
        case VmCommands.CMA:
          console.log('comparar maior', M[sAux - 1]);
          if (M[sAux - 1] > M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          incrementI();
          break;
        case VmCommands.CEQ:
          console.log('comparar igual', M[sAux - 1], M[sAux]);
          if (M[sAux - 1] === M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          incrementI();
          break;
        case VmCommands.CDIF:
          console.log('comparar desigual', M[sAux - 1], M[sAux]);
          if (M[sAux - 1] !== M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          incrementI();
          break;
        case VmCommands.CMEQ:
          console.log('comparar menor ou igual', M[sAux - 1], M[sAux]);
          if (M[sAux - 1] <= M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          incrementI();
          break;
        case VmCommands.CMAQ:
          console.log('comparar maior ou igual', M[sAux - 1], M[sAux]);
          if (M[sAux - 1] >= M[sAux]) {
            M[sAux - 1] = 1;
          } else {
            M[sAux - 1] = 0;
          }
          decrementS();
          incrementI();
          break;
        case VmCommands.HLT:
          console.log('parar');
          stopVm = true;
          incrementI();
          break;
        case VmCommands.STR:
          console.log('armazenar valor', firstParam);
          M[firstParam] = M[sAux];
          decrementS();
          incrementI();
          break;
        case VmCommands.JMP:
          console.log('param', firstParam);
          if (firstParam) {
            iAux = firstParam;
          } else {
            stopVm = true;
          }
          break;
        case VmCommands.JMPF:
          console.log('param', firstParam);
          console.log('desviar se falso');
          if (!firstParam) {
            stopVm = true;
          }

          if (M[sAux] === 0) {
            iAux = firstParam;
          } else {
            iAux += 1;
          }
          break;
        case VmCommands.NULL:
          console.log('nada');
          incrementI();
          break;
        case VmCommands.RD:
          console.log('leitura');
          incrementS();
          userInput = 2;
          inputArray.push(userInput);
          M[sAux] = userInput;
          incrementI();
          break;
        case VmCommands.PRN:
          console.log('impressão');
          outputArray.push(M[sAux]);
          decrementS();
          incrementI();
          break;
        case VmCommands.ALLOC:
          console.log('alocar memoria');
          if (firstParam >= 0 && secondParam >= 0) {
            console.log('params', firstParam, secondParam);
            for (let k = 0; k <= secondParam - 1; k += 1) {
              console.log('k', k);
              incrementS();
              M[sAux] = M[firstParam + k];
              console.log('alocação', M[sAux]);
            }
            incrementI();
          } else {
            stopVm = true;
          }
          break;
        case VmCommands.DALLOC:
          console.log('desalocar memoria');
          if (firstParam >= 0 && secondParam >= 0) {
            for (let k = secondParam - 1; k >= 0; k -= 1) {
              M[firstParam + k] = M[sAux];
              console.log('desalocação', M[sAux], M[firstParam + k]);
              decrementS();
            }
            incrementI();
          } else {
            stopVm = true;
          }
          break;
        case VmCommands.CALL:
          console.log(
            'chamar procedimento ou função',
            firstParam,
            iAux,
            M[sAux]
          );
          incrementS();
          M[sAux] = iAux + 1;
          iAux = firstParam;
          break;
        case VmCommands.RETURN:
          console.log('retornar de procedimento', M[sAux]);
          iAux = M[sAux];
          decrementS();
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
