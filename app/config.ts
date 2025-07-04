const isMobile =
  typeof globalThis === "undefined" ? false : globalThis.innerWidth < 640;

const config = {
  geoCodingApi: "https://nominatim.openstreetmap.org",
  routingApi: "https://router.project-osrm.org/route/v1",
  mapConfig: {
    // Coordenadas Universidad Adolfo Ibáñez -33.485982, -70.518233
    center: [-70.518233, -33.485982],
    zoom: isMobile ? 17 : 18.5,
    bearing: -270, // Sin rotación para empezar
    pitch: 40,
    // Bounds que cubren el campus UAI
    maxBounds: [
      [-70.520000, -33.490000], // Southwest
      [-70.512000, -33.483000], // Northeast
    ],
  } as maplibregl.MapOptions,
  mapStyles: {
    light: "https://tiles.openfreemap.org/styles/bright",
    dark: "/styles/dark/style.json",
  },
};

export default config;