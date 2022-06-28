import equipamentos from '../assets/data/equipment.json';
import modelosEquipamentos from '../assets/data/equipmentModel.json';
import estados from '../assets/data/equipmentState.json';
import historicoEstados from '../assets/data/equipmentStateHistory.json';
import historicoPosicao from '../assets/data/equipmentPositionHistory.json';

var equipamentoCompleto: any = [];
var posicaoEquipamento: any = [];
var estadoHistorico:any = [];

equipamentos.forEach((equipamento: any) => {

 var modelos = modelosEquipamentos.filter((model:any) => model.id === equipamento.equipmentModelId);
 var estadosEquipamento = historicoEstados.filter((estadoEquipamento: any) => estadoEquipamento.equipmentId === equipamento.id);

 var lastResult = estadosEquipamento[0].states.length;
 var estadoRecente = estados.filter((estado: any) => estado.id === estadosEquipamento[0].states[lastResult - 1].equipmentStateId);
 var positionEquipamento = historicoPosicao.filter((posicao: any) => posicao.equipmentId === equipamento.id);
 var lastResultPosition = positionEquipamento[0].positions.length;
 var posicaoRecente = positionEquipamento[0].positions[lastResultPosition - 1];

 equipamentoCompleto.push({
     id: equipamento.id,
     name: equipamento.name,
     modelo: modelos[0].name,
     estado: estadoRecente[0].name,
     cor: estadoRecente[0].color,
     dataRecente: new Date(estadosEquipamento[0].states[lastResult - 1].date),
     localizacao: posicaoRecente
   });

   posicaoEquipamento.push({
    PR: posicaoRecente
   })

   estadoHistorico.push({
    historico:estadosEquipamento
   })

// console.log("Array prontinho", equipamentoCompleto)
});

export { equipamentoCompleto, posicaoEquipamento, estadoHistorico };