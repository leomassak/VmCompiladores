import React, { useContext, createContext } from 'react';
import { VmCommands } from '../utils/consts/vmComands';

const Context = createContext();

function VmContext({ children }) {
  const P = [];
  const M = [];
  const inputArray = [];
  const outputArray = [];

  let i = 0;
  let s = 0;

  function incrementI() {
    i += 1;
  }

  function incrementS() {
    s += 1;
  }

  function decrementI() {
    if (i > 0) {
      i -= 1;
    }
  }

  function decrementS() {
    if (s > 0) {
      s -= 1;
    }
  }

  function clearI() {
    i = 0;
  }

  function clearS() {
    s = 0;
  }

  function runVm(rows) {
    rows.forEach((item, index) => {
      if (index === 0) console.log(item);
      const [command] = item[1];
      switch (command) {
        case VmCommands.LDC:
          console.log('carregar constante');
          incrementS();
          M.push(item[2]);
          break;
        case VmCommands.LDV:
          console.log('carregar valor');
          incrementS();
          M.push(M[item[2]]);
          break;
        case VmCommands.ADD:
          console.log('somar');
          M[s - 1] = M[s - 1] + M[s];
          decrementS();
          break;
        case VmCommands.SUB:
          console.log('subtrair');
          M[s - 1] = M[s - 1] - M[s];
          decrementS();
          break;
        case VmCommands.MULT:
          console.log('multiplicar');
          M[s - 1] = M[s - 1] * M[s];
          decrementS();
          break;
        case VmCommands.DIVI:
          console.log('dividir');
          M[s - 1] = M[s - 1] / M[s];
          decrementS();
          break;
        case VmCommands.INV:
          console.log('inverte o sinal');
          M[s] = -M[s];
          break;
        case VmCommands.AND:
          console.log('conjunção');
          if (M[s - 1] === 1 && M[s] === 1) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.OR:
          console.log('disjunção');
          if (M[s - 1] === 1 || M[s] === 1) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.NEG:
          console.log('negação');
          M[s] = 1 - M[s];
          break;
        case VmCommands.CME:
          console.log('comparar menor');
          if (M[s - 1] < M[s]) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.CMA:
          console.log('comparar maior');
          if (M[s - 1] > M[s]) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.CEQ:
          console.log('comparar igual');
          if (M[s - 1] == M[s]) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.CDIF:
          console.log('comparar desigual');
          if (M[s - 1] != M[s]) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.CMEQ:
          console.log('comparar menor ou igual');
          if (M[s - 1] <= M[s]) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.CMAQ:
          console.log('comparar maior ou igual');
          if (M[s - 1] >= M[s]) {
            M[s - 1] = 1;
          } else {
            M[s - 1] = 0;
          }
          decrementS();
          break;
        case VmCommands.START:
          console.log('iniciar programa principal');
          s = -1;
          break;
        case VmCommands.HLT:
          console.log('parar');
          break;
        case VmCommands.STR:
          console.log('armazenar valor');
          M[item[2]] = M[s];
          decrementS();
          break;
        case VmCommands.JMP:
          console.log('desviar sempre');
          i = item[2];
          break;
        case VmCommands.JMPF:
          console.log('desviar se falso');
          if (M[s] == 0) {
            i = item[2];
          } else {
            i += 1;
          }
          break;
        case VmCommands.NULL:
          console.log('nada');
          break;
        case VmCommands.RD:
          console.log('leitura');
          break;
        case VmCommands.PRN:
          console.log('impressão');
          break;
        case VmCommands.ALLOC:
          console.log('alocar memoria');
          break;
        case VmCommands.DALLOC:
          console.log('desalocar memoria');
          break;
        case VmCommands.CALL:
          console.log('chamar procedimento ou função');
          break;
        case VmCommands.RETURN:
          console.log('retornar de procedimento');
          break;
        default:
          console.log(command, 'é um comando inválido');
          break;
      }
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
