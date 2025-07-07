import { useEffect, useState } from "react";
import useFloorStore from "~/stores/floor-store";
import IndoorMapLayer from "~/layers/indoor-map-layer";
import POIsLayer from "~/layers/pois-layer";

interface FloorSelectorProps {
  indoorMapLayer: IndoorMapLayer;
  poisLayer: POIsLayer;
}

export function FloorSelector({ indoorMapLayer, poisLayer }: FloorSelectorProps) {
  const { currentFloor, setCurrentFloor } = useFloorStore();
  const [availableFloors, setAvailableFloors] = useState<number[]>([1]);

  useEffect(() => {
    const loadFloors = async () => {
      const floors = await indoorMapLayer.getAvailableFloors();
      setAvailableFloors(floors.sort((a, b) => a - b)); // Sort ascending: 1, 2
    };
    loadFloors();
  }, [indoorMapLayer]);

  const handleFloorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const floor = Number.parseInt(event.target.value);
    setCurrentFloor(floor);
    
    // Actualizar AMBAS capas
    indoorMapLayer.setFloorLevel(floor);
    poisLayer.setFloorLevel(floor);
  };
  
  return (
    <div className="absolute right-2 top-2 z-10">
      <select
        value={currentFloor}
        onChange={handleFloorChange}
        className="rounded-md border bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none dark:bg-gray-900"
      >
        {availableFloors.map((floor) => (
          <option key={floor} value={floor}>
            Piso {floor}
          </option>
        ))}
      </select>
    </div>
  );
}