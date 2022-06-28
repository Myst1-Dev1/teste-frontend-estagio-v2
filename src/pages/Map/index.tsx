import "./index.scss";
import { Link } from "react-router-dom";
import { equipamentoCompleto } from "../../service/equipamentoService";
const { MapContainer, TileLayer, Popup, Polyline, Marker } = require("react-leaflet"); 

export default function Map() {

    const position = [-19.151801, -46.007759] 

    return(
        <>
           
           <div className="back">
            <button><Link to = {"/"}>Home</Link></button>
           </div>
        
        <MapContainer center={position} zoom={10} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

            {
                equipamentoCompleto.map((posicao: any) => (
                <Marker position={[posicao.localizacao.lat, posicao.localizacao.lon]}>
                    <Popup>
                   <h6> {posicao.name}</h6>
                   <h6>{posicao.modelo}</h6>
                    <h6 style={{color: `${posicao.cor}`}}>{posicao.estado} </h6> 
                    </Popup>
                </Marker>
                ))
            }
    </MapContainer>

    </>
    )
}