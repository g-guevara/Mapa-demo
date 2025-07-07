import { CustomLayerInterface, Map } from "maplibre-gl";

export default class POIsLayer implements CustomLayerInterface {
  id: string = "pois";
  type = "custom" as const;
  private map: Map | null = null;
  private POIs: GeoJSON.GeoJSON;
  private theme;

  constructor(POIs: GeoJSON.GeoJSON, theme: string = "light") {
    this.POIs = POIs;
    this.theme = theme;
  }

  render = () => {
    // Rendering is handled by maplibre's internal renderer for geojson sources
  };

  setFloorLevel(level: number) {
    if (!this.map || !this.POIs) return;

    const source = this.map.getSource("pois") as maplibregl.GeoJSONSource;
    
    // Filtrar POIs por el piso actual
    const filteredFeatures = (this.POIs as GeoJSON.FeatureCollection).features.filter(
      (feature) => {
        const floor = feature.properties?.floor;
        return floor === level;
      }
    );

    source.setData({
      type: "FeatureCollection",
      features: filteredFeatures,
    });
  }

  onAdd?(map: Map): void {
    this.map = map;
    
    const lightColor = {
      text: "#404040",
      halo: "#ffffff",
      circle: "#695f58",
    };

    const darkColor = {
      text: "#ffffff",
      halo: "#404040",
      circle: "#9ca3af",
    };

    const color = this.theme === "light" ? lightColor : darkColor;

    map.addSource("pois", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [], // Empezar vacío, se llenará con setFloorLevel
      },
    });

    map.addLayer({
      id: "point",
      type: "circle",
      source: "pois",
      minzoom: 16,
      paint: {
        "circle-radius": 4,
        "circle-color": color.circle,
      },
    });

    map.addLayer({
      id: "point-label",
      type: "symbol",
      source: "pois",
      minzoom: 16,
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Noto Sans Regular"],
        "text-size": 12,
        "text-offset": [0.8, 0],
        "text-anchor": "left",
        "text-max-width": 12,
      },
      paint: {
        "text-color": color.text,
        "text-halo-color": color.halo,
        "text-halo-width": 1.5,
      },
    });
  }
}