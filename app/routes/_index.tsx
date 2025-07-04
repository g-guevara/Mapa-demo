import type { MetaFunction } from "@remix-run/node";
import MapComponent from "~/components/map-component";
import { Analytics } from "@vercel/analytics/remix";
export const meta: MetaFunction = () => {
  return [
    { title: "Demo Mapa" },
    {
      name: "description",
      content:
        "Navegacion indoor de campus",
    },
  ];
};

export default function Index() {
  return (
    <div className="flex h-svh items-center justify-center">
      <Analytics />

      <MapComponent />
    </div>
  );
}
