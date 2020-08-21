const ALL_COMMANDS = {
  LDC: 'LDC',
  LDV: 'LDV',
  ADD: 'ADD',
  SUB: 'SUB',
  MULT: 'MULT',
  DIVI: 'DIVI',
  INV: 'INV',
  AND: 'AND',
  OR: 'OR',
  NEG: 'NEG',
  CME: 'CME',
  CMA: 'CMA',
  CEQ: 'CEQ',
  CDIF: 'CDIF',
  CMEQ: 'CMEQ',
  CMAQ: 'CMAQ',
  START: 'START',
  HLT: 'HLT',
  STR: 'STR',
  JMP: 'JMP',
  JMPF: 'JMPF',
  NULL: 'NULL',
  RD: 'RD',
  PRN: 'PRN',
  ALLOC: 'ALLOC',
  DALLOC: 'DALLOC',
  CALL: 'CALL',
  RETURN: 'RETURN',
};

export function commands(command) {
  switch (command) {
    case ALL_COMMANDS.LDC:
      console.log('carregar constante');
      break;
    case ALL_COMMANDS.LDV:
      console.log('carregar valor');
      break;
    case ALL_COMMANDS.ADD:
      console.log('somar');
      break;
    case ALL_COMMANDS.SUB:
      console.log('subtrair');
      break;
    case ALL_COMMANDS.MULT:
      console.log('multiplicar');
      break;
    case ALL_COMMANDS.DIVI:
      console.log('dividir');
      break;
    case ALL_COMMANDS.INV:
      console.log('inverte o sinal');
      break;
    case ALL_COMMANDS.AND:
      console.log('conjunção');
      break;
    case ALL_COMMANDS.OR:
      console.log('disjunção');
      break;
    case ALL_COMMANDS.NEG:
      console.log('negação');
      break;
    case ALL_COMMANDS.CME:
      console.log('comparar menor');
      break;
    case ALL_COMMANDS.CMA:
      console.log('comparar maior');
      break;
    case ALL_COMMANDS.CEQ:
      console.log('comparar igual');
      break;
    case ALL_COMMANDS.CDIF:
      console.log('comparar desigual');
      break;
    case ALL_COMMANDS.CMEQ:
      console.log('comparar menor ou igual');
      break;
    case ALL_COMMANDS.CMAQ:
      console.log('comparar maior ou igual');
      break;
    case ALL_COMMANDS.START:
      console.log('iniciar programa principal');
      break;
    case ALL_COMMANDS.HLT:
      console.log('parar');
      break;
    case ALL_COMMANDS.STR:
      console.log('armazenar valor');
      break;
    case ALL_COMMANDS.JMP:
      console.log('desviar sempre');
      break;
    case ALL_COMMANDS.JMPF:
      console.log('desviar se falso');
      break;
    case ALL_COMMANDS.NULL:
      console.log('nada');
      break;
    case ALL_COMMANDS.RD:
      console.log('leitura');
      break;
    case ALL_COMMANDS.PRN:
      console.log('impressão');
      break;
    case ALL_COMMANDS.ALLOC:
      console.log('alocar memoria');
      break;
    case ALL_COMMANDS.DALLOC:
      console.log('desalocar memoria');
      break;
    case ALL_COMMANDS.CALL:
      console.log('chamar procedimento ou função');
      break;
    case ALL_COMMANDS.RETURN:
      console.log('retornar de procedimento');
      break;
    default:
      console.log(command, 'é um comando inválido');
      break;
  }
}
