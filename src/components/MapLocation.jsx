import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapLocation = (props) => {

	return (
		<MapContainer
			key={`${props.city.latitude}-${props.city.longitude}`}
			center={[props.city.latitude, props.city.longitude]}
			zoom={props.city.zoom}
			style={{ height: '400px', width: '100%', borderRadius: '20px', boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.3)', border: '10px solid #fff' }}
			scrollWheelZoom={false}
		>	
			<TileLayer
				url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
				// url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
			/>
		</MapContainer>
	);
};

export default MapLocation;