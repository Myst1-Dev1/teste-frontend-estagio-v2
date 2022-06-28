import "./index.scss";
import { Link } from "react-router-dom";
import { estadoHistorico } from "../../service/equipamentoService";
import { useParams } from "react-router-dom";
import { equipamentoCompleto } from "../../service/equipamentoService";
import moment from "moment";
const seta = require("../../assets/img/seta.png");

const estados = require('../../assets/data/equipmentState.json')

export default function Historico() {

    function Data(e:any){
        console.log("Data",e)
        return moment(e).format("DD/MM/YYYY HH:mm");
    }
    const {
        id
    } = useParams();
    var historico = estadoHistorico.filter((estado:any) => estado.historico[0].equipmentId === id);
    var result = equipamentoCompleto.filter((equipamento:any) => equipamento.id === id);

    var historicosEquipamento: any = [];
    historico[0].historico[0].states.forEach((e: any) => {

      var estadoName = estados.filter((estado: any) => estado.id === e.equipmentStateId);
      historicosEquipamento.push({
        date: Data(e.date),
        estado: estadoName[0].name,
        cor: estadoName[0].color
      })
    });

    return(
    <>
                    <div className="back">
                    <Link to = {"/"}><img src={seta}/></Link>
                    </div>
        
                    <div className="historico mt-3 container">
                    <span>{result[0].modelo} </span>
                    <h3 className="me-4">{result[0].name}</h3>
                    </div>

                    <div className="container">
                        <table className="table table-striped mt-3">
                            <thead>
                            <tr>
                                <th>Data</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                    historicosEquipamento.map((estado:any) => (
                                    <tr> 
                                            <td>{estado.date}</td>
                                            <td>{estado.estado}</td>
                                            <td><p className="ponto" style={{backgroundColor: `${estado.cor}`}}></p></td>
                                    </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
       

    </>
    )
}