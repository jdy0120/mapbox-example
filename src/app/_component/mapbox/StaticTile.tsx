// 타일 좌표 계산 함수
function lngLatToTile(lon: number, lat: number, zoom: number) {
  const x = Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
  const y = Math.floor(
    ((1 -
      Math.log(
        Math.tan((lat * Math.PI) / 180) +
          1 / Math.cos((lat * Math.PI) / 180),
      ) /
        Math.PI) /
      2) *
      Math.pow(2, zoom),
  );
  return { x, y };
}

const MapTile = () => {
  const lon = 127.0304;
  const lat = 37.4911;
  const zoom = 17;

  const { x, y } = lngLatToTile(lon, lat, zoom);

  const tileUrl = `https://api.mapbox.com/v4/mapbox.satellite/${zoom}/${x}/${y}@2x.jpg90?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1>🧱 Static Tile 보기</h1>
      <p>
        Tile 좌표:{" "}
        <b>
          {zoom}/{x}/{y}
        </b>
      </p>
      <img
        src={tileUrl}
        alt='Map Tile'
        style={{
          width: "512px",
          height: "512px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default MapTile;
