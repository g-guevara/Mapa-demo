import { NavigationControl } from "maplibre-gl";
import { useEffect } from "react";
import IndoorMapLayer from "~/layers/indoor-map-layer";
import POIsLayer from "~/layers/pois-layer";
import useFloorStore from "~/stores/floor-store";
import useMapStore from "~/stores/use-map-store";

interface FloorUpDownControlProps {
  indoorMapLayer: IndoorMapLayer;
  poisLayer: POIsLayer;
}

export function FloorUpDownControl({
  indoorMapLayer,
  poisLayer,
}: FloorUpDownControlProps) {
  const map = useMapStore((state) => state.mapInstance);
  const { currentFloor, setCurrentFloor } = useFloorStore();

  useEffect(() => {
    const floorControl = new NavigationControl({
      showCompass: false,
      showZoom: false,
      visualizePitch: false,
    });

    map?.addControl(floorControl, "bottom-right");

    const upButton = document.createElement("button");
    upButton.className =
      "maplibregl-ctrl-icon maplibregl-ctrl-floor-up dark:text-black";
    upButton.innerHTML = "&#8593;"; // Up arrow
    upButton.addEventListener("click", () => {
      const nextFloor = currentFloor + 1;
      if (nextFloor <= 2) { // Máximo piso 2
        setCurrentFloor(nextFloor);
        
        // Actualizar AMBAS capas
        indoorMapLayer.setFloorLevel(nextFloor);
        poisLayer.setFloorLevel(nextFloor);
      }
    });

    const downButton = document.createElement("button");
    downButton.className =
      "maplibregl-ctrl-icon maplibregl-ctrl-floor-down dark:text-black";
    downButton.innerHTML = "&#8595;"; // Down arrow
    downButton.addEventListener("click", () => {
      const nextFloor = currentFloor - 1;
      if (nextFloor >= 1) { // Mínimo piso 1
        setCurrentFloor(nextFloor);
        
        // Actualizar AMBAS capas
        indoorMapLayer.setFloorLevel(nextFloor);
        poisLayer.setFloorLevel(nextFloor);
      }
    });

    floorControl._container.append(upButton);
    floorControl._container.append(downButton);

    return () => {
      map?.removeControl(floorControl);
    };
  }, [map, currentFloor, setCurrentFloor, indoorMapLayer, poisLayer]);

  return null;
}