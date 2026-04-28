import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function TripMap({ places = [], center, zoom = 12 }) {
  const validPlaces = places.filter(p => p?.lat && p?.lng && p?.name);
  if (validPlaces.length === 0) return null;

  const mapCenter = center
    ? [center.lat, center.lng]
    : [validPlaces[0].lat, validPlaces[0].lng];

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      style={{ height: '420px', width: '100%', borderRadius: '1rem' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {validPlaces.map((place, idx) => (
        <Marker
          key={idx}
          position={[place.lat, place.lng]}
          title={place.name}
        >
          <Tooltip
            permanent
            direction="top"
            offset={[0, -28]}
            opacity={1}
          >
            <span style={{ fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap' }}>
              📍 {place.name}
            </span>
          </Tooltip>
          <Popup>
            <strong>📍 {place.name}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default TripMap;
