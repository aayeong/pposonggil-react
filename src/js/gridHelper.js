// gridHelper.js
export const createGrid = (map, kakao) => {
  const bounds = map.getBounds();
  const level = map.getLevel();

  const southWest = bounds.getSouthWest();
  const northEast = bounds.getNorthEast();

  const swLat = southWest.getLat();
  const swLon = southWest.getLng();
  const neLat = northEast.getLat();
  const neLon = northEast.getLng();

  const latStep = (neLat - swLat) / 10;
  const lonStep = (neLon - swLon) / 10;

  const lines = [];

  for (let i = 0; i <= 10; i++) {
    const lat = swLat + latStep * i;
    const lon = swLon + lonStep * i;

    lines.push(new kakao.maps.Polyline({
      map: map,
      path: [
        new kakao.maps.LatLng(lat, swLon),
        new kakao.maps.LatLng(lat, neLon)
      ],
      strokeWeight: 1,
      strokeColor: '#ff0000',
      strokeOpacity: 0.5,
      strokeStyle: 'solid'
    }));

    lines.push(new kakao.maps.Polyline({
      map: map,
      path: [
        new kakao.maps.LatLng(swLat, lon),
        new kakao.maps.LatLng(neLat, lon)
      ],
      strokeWeight: 1,
      strokeColor: '#ff0000',
      strokeOpacity: 0.5,
      strokeStyle: 'solid'
    }));
  }

  return lines;
};


