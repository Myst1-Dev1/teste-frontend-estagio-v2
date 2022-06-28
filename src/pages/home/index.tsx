import "./index.scss";
import { useEffect, useState } from "react";
import { equipamentoCompleto } from "../../service/equipamentoService";
import { Link } from "react-router-dom";


export default function Home(){

    const [pesquisa, setPesquisa] = useState("");
    const [equipamentosMap, setEquipamentosMap] = useState([]);
    const [estado, setEstado] = useState("");
    const [modelo, setModelo] = useState("");

    function Filtro() {
        if(pesquisa !== ""){
            setEquipamentosMap(equipamentoCompleto.filter((e:any) => e.name === pesquisa));
        }else{
            setEquipamentosMap(equipamentoCompleto)
        }
      }

      function Estado() {
        if(estado !== "") {
            if(estado === "Todos") {
                setEquipamentosMap(equipamentoCompleto);
            }else {
                setEquipamentosMap(equipamentoCompleto.filter((e:any) => e.estado === estado));
            }
        }   
        else{
            setEquipamentosMap(equipamentoCompleto);
        }
      }

      function Modelo() {
        if(modelo !== "") {
            if(modelo === "Todos") {
                setEquipamentosMap(equipamentoCompleto)
            } 
        else{
            setEquipamentosMap(equipamentoCompleto.filter((e:any) => e.modelo === modelo));
        }
        }
        else{
            setEquipamentosMap(equipamentoCompleto);
        }
      }

      function Limpar() {
        setPesquisa("");
        setEstado("");
        setModelo("");
      }

    useEffect(() => {
        Filtro()
    }, [pesquisa])
    useEffect(() => {
        setEquipamentosMap(equipamentoCompleto)
    }, [])

    useEffect(() => {
        Estado()
    }, [estado])

    useEffect(() => {
        Modelo()
    }, [modelo])
    


    console.log(modelo);

    return(
        <>
        
        <div className="h-100-vh">
        <div className="row row-alter h-100">
            <div className="col-md-3 filter d-flex justify-content-between flex-column p-4">
               
               <div className="subtitle">
                    <h4 className="mb-4">Filters</h4>
                    <p>Status</p>
                    <select onChange={(e:any) => setEstado(e.target.value)} value = {estado} >
                        <option value="Todos">Todos</option>
                        <option value="Operando">Operando</option>
                        <option value="Parado">Parado</option>
                        <option value="Manutenção">Manutenção</option>
                    </select>

                    <p>Modelo</p>
                    <select onChange={(e:any) => setModelo(e.target.value)} value = {modelo}>
                        <option value="Todos">Todos</option>
                        <option value="Caminhão de carga">Caminhão de carga</option>
                        <option value="Harvester">Harvester</option>
                        <option value="Garra traçadora">Garra traçadora</option>
                    </select>

                    <button className="w-100 mt-5 p-2 bg-dark-green"><Link className="btnH text-light" to="/Map">Ver mapa com localização dos equipamentos</Link></button>

                </div>

                <div className="btn-group d-flex justify-content-center">
                    <button onClick={Limpar}>Limpar</button>
                </div>
               
            </div>
            <div className="col-md-9">
                <div className="container">
                        <div className="row mt-5">
                            <div className="col-md-6 search-group">
                                <input type="text" placeholder="Pesquisar equipamento" onChange={(e:any) => setPesquisa(e.target.value)} value = {pesquisa}/>
                            </div>
                        </div>
                    <div className="row mt-5">
                        { 
                     equipamentosMap.length > 0 ?
                     equipamentosMap.map((equipamento:any) => (
                        <div className="col-md-4 mb-3" key={equipamento.id}>
                            <div className="card" style={{width: "100%"}}>   
                                <div className="card-body">
                                    <h5 className="card-title">{equipamento.name}</h5> 
                                    <h6 className="card-subtitle mb-2">Modelo: {equipamento.modelo}</h6>
                                    <h6 className="card-subtitle mb-3">Estado: <span style={{color: `${equipamento.cor}`}}>{equipamento.estado}</span></h6>
                                    <h6 className="card-subtitle mb-5">Localização:<Link className="btnH text-primary" to={`/map/${equipamento.id}`}>Veja a localização</Link></h6>
                                    <button className="bg-green border-light text-light w-100"> <Link className="btnH text-light" to={`/historico/${equipamento.id}`}>Ver histórico</Link></button>         
                                </div>  
                            </div>
                        </div>
                        )):<p>Equipamento não encontrado</p>
                        }    
                    </div>


                     



            </div>
        </div>
        
        </div>
        </div>         
        </>
    )
}