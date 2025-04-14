"use client";

import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TilequeryMap = () => {
  const MAPBOX_TOKEN =
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: "tilequery-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [127.0304, 37.4911],
      zoom: 15,
    });

    map.on("click", async (e) => {
      const { lng, lat } = e.lngLat;
      const tilesetId = "mapbox.mapbox-streets-v8";
      const layer = "building";

      const url = `https://api.mapbox.com/v4/${tilesetId}/tilequery/${lng},${lat}.json?layers=${layer}&radius=20&limit=1&access_token=${MAPBOX_TOKEN}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        if (data && data.features && data.features.length > 0) {
          const props = data.features[0].properties;
          const coords = data.features[0].geometry.coordinates;

          new mapboxgl.Popup()
            .setLngLat([lng, lat])
            .setHTML(
              `<strong>건물 정보</strong><br /> height: ${
                props.height || "N/A"
              }<br /> type: ${props.class || "N/A"}`,
            )
            .addTo(map);
        } else {
          new mapboxgl.Popup()
            .setLngLat([lng, lat])
            .setHTML("해당 위치의 건물 정보를 찾을 수 없습니다.")
            .addTo(map);
        }
      } catch (err) {
        console.error("Tilequery error:", err);
      }
    });

    return () => map.remove();
  }, []);

  return (
    <div
      id='tilequery-map'
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export default TilequeryMap;
