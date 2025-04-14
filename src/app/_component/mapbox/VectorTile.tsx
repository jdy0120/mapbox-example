"use client";

import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const VectorMap = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      center: [127.0304, 37.4911],
      zoom: 14,
    });

    map.on("load", () => {
      // 🚧 도로 레이어
      map.addLayer({
        id: "my-roads",
        type: "line",
        source: {
          type: "vector",
          url: "mapbox://mapbox.mapbox-streets-v8",
        },
        "source-layer": "road",
        paint: {
          "line-color": "#ff4d4f",
          "line-width": 2,
        },
      });

      // 🏢 건물 레이어
      map.addLayer({
        id: "my-buildings",
        type: "fill",
        source: {
          type: "vector",
          url: "mapbox://mapbox.mapbox-streets-v8",
        },
        "source-layer": "building",
        paint: {
          "fill-color": "#3f6600",
          "fill-opacity": 0.5,
        },
      });

      // 🌊 수역 레이어
      map.addLayer({
        id: "my-water",
        type: "fill",
        source: {
          type: "vector",
          url: "mapbox://mapbox.mapbox-streets-v8",
        },
        "source-layer": "water",
        paint: {
          "fill-color": "#1890ff",
          "fill-opacity": 0.6,
        },
      });
    });
  }, []);

  return <div id='map' style={{ width: "100%", height: "100vh" }} />;
};

export default VectorMap;
