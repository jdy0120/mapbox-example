"use client";

import { Select } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <>
      <Select
        options={[
          // { id: "dataset", label: "Dataset", value: "dataset" },
          { id: "font", label: "Font", value: "font" },
          {
            id: "mapboxtile",
            label: "MapBoxTile",
            value: "mapboxtile",
          },
          // {
          //   id: "mapservicechangelog",
          //   label: "MapServiceChangelog",
          //   value: "mapservicechangelog",
          // },
          { id: "raster", label: "Raster", value: "raster" },
          {
            id: "staticimage",
            label: "StaticImage",
            value: "staticimage",
          },
          {
            id: "statictile",
            label: "StaticTile",
            value: "statictile",
          },
          { id: "style", label: "Style", value: "style" },
          { id: "tilequery", label: "TileQuery", value: "tilequery" },
          // { id: "upload", label: "Upload", value: "upload" },
          { id: "vector", label: "Vector", value: "vector" },
        ]}
        onChange={(value) => {
          router.push(`/map/types/${value}`);
        }}
        size='large'
        style={{ width: "100%", marginBottom: "20px" }}
      />
      {children}
    </>
  );
};

export default layout;
