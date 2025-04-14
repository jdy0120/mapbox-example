"use client";

import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const RasterMap = () => {
  useEffect(() => {
    // Mapbox access token (필수 아님 - raster tile만 쓸 땐 불필요)
    mapboxgl.accessToken =
      process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

    // 지도 생성
    const map = new mapboxgl.Map({
      container: "map",
      style: {
        version: 8,
        sources: {
          "osm-tiles": {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", // OSM 타일 URL
            ],
            tileSize: 256,
            attribution:
              '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        },
        layers: [
          {
            id: "osm-layer",
            type: "raster",
            source: "osm-tiles",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [127.0304, 37.4911], // 서울 대치동 근처
      zoom: 15,
    });

    return () => map.remove(); // 컴포넌트 언마운트 시 정리
  }, []);

  return <div id='map' style={{ width: "100%", height: "100vh" }} />;
};

export default RasterMap;
