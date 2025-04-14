"use client";

import React, { useEffect } from "react";
import MapboxGL from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styleObject = {
  version: 8 as const,
  sources: {
    "osm-tiles": {
      type: "raster" as const,
      tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: "osm-tiles",
      type: "raster" as const,
      source: "osm-tiles",
      minzoom: 0,
      maxzoom: 22,
    },
  ],
};

const MapBoxStyle = () => {
  useEffect(() => {
    MapboxGL.accessToken =
      process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    new MapboxGL.Map({
      container: "map",
      style: styleObject,
      center: [127.0304, 37.4911],
      zoom: 17,
      pitch: 45,
    });

    // map.on("load", () => {
    //   map.addSource("points", {
    //     type: "geojson",
    //     data: {
    //       type: "FeatureCollection",
    //       features: [
    //         {
    //           type: "Feature",
    //           geometry: {
    //             type: "Point",
    //             coordinates: [127.0304, 37.4911],
    //           },
    //           properties: {
    //             title: "Mapbox",
    //             description: "Test description",
    //           },
    //         },
    //       ],
    //     },
    //   });

    //   map.addLayer({
    //     id: "points",
    //     type: "circle",
    //     source: "points",
    //     paint: {
    //       "circle-radius": 10,
    //       "circle-color": "#007cbf",
    //     },
    //   });

    //   map.on("click", "points", (e) => {
    //     if (!e?.features) return;
    //     const coordinates = (e.features[0].geometry as GeoJSON.Point)
    //       .coordinates as [number, number];

    //     const popupNode = document.createElement("div");
    //     ReactDOM.render(<TestComponent />, popupNode);

    //     new MapboxGL.Popup()
    //       .setLngLat(coordinates)
    //       .setDOMContent(popupNode)
    //       .addTo(map);
    //   });

    //   map.on("mouseenter", "points", () => {
    //     map.getCanvas().style.cursor = "pointer";
    //   });

    //   map.on("mouseleave", "points", () => {
    //     map.getCanvas().style.cursor = "";
    //   });
    // });
  }, []);

  return <div id='map' style={{ width: "100%", height: "100vh" }} />;
};

export default MapBoxStyle;
