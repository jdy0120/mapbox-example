"use client";

import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

const MapEventsExample = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [127.0304, 37.4911],
      zoom: 13,
    });

    const log = (event: string) => () => {
      console.log(`🟢 ${event} 이벤트 발생`);
    };

    // 기본 지도 이벤트
    map.on("load", log("load"));
    map.on("click", (e) => {
      console.log("🖱 click:", e.lngLat);
    });
    map.on("dblclick", log("dblclick"));
    map.on("mousemove", log("mousemove"));
    map.on("mousedown", log("mousedown"));
    map.on("mouseup", log("mouseup"));
    map.on("mouseenter", log("mouseenter"));
    map.on("mouseleave", log("mouseleave"));

    // 지도 이동/확대/회전 관련
    map.on("move", log("move"));
    map.on("movestart", log("movestart"));
    map.on("moveend", log("moveend"));
    map.on("zoomstart", log("zoomstart"));
    map.on("zoomend", log("zoomend"));
    map.on("dragstart", log("dragstart"));
    map.on("dragend", log("dragend"));
    map.on("rotate", log("rotate"));
    map.on("pitch", log("pitch"));

    // 터치 이벤트
    map.on("touchstart", log("touchstart"));
    map.on("touchend", log("touchend"));

    // 기타
    map.on("resize", log("resize"));
    map.on("error", (e) => console.error("❌ error:", e.error));

    return () => {
      map.remove();
    };
  }, []);

  return <div id='map' style={{ width: "100%", height: "100vh" }} />;
};

export default MapEventsExample;
