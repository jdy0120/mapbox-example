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
      map.addSource("mapbox-streets", {
        type: "vector",
        url: "mapbox://mapbox.mapbox-streets-v8",
      });

      map.addLayer({
        id: "road-layer",
        type: "line",
        source: "mapbox-streets",
        "source-layer": "road", // 🧠 실제 레이어 이름 (Mapbox Docs 참고)
        paint: {
          "line-color": "#ff0000",
          "line-width": 2,
        },
      });
    });
  }, []);

  return <div id='map' style={{ width: "100%", height: "100vh" }} />;
};

export default VectorMap;
