import './index.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { equipamentoCompleto } from "../../service/equipamentoService";
const { MapContainer, TileLayer, Popup, Polyline, Marker } = require("react-leaflet"); 

export default function MapId() {
    const {
        id
    } = useParams();
    var result = equipamentoCompleto.filter((equipamento: any) => equipamento.id === id);

    return(

        <>
            <div className="back">
            <button><Link to = {"/"}>Home</Link></button>
           </div>

        <MapContainer center={[result[0].localizacao.lat, result[0].localizacao.lon]} zoom={10} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

            {
              
                <Marker position={[result[0].localizacao.lat, result[0].localizacao.lon]}>
                    <Popup>
                        <h6>{result[0].name}</h6>
                        <h6>{result[0].modelo}</h6>
                        <h6 style={{color: `${result[0].cor}`}}>{result[0].estado}</h6>
                    </Popup>
                </Marker>
                
            }
    </MapContainer>

    </>
    )
}