"use client";

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  MapRoute,
} from "@/components/ui/map";
import { Card } from "@/components/ui/card";

const route = [
  [-74.006, 40.7128], // NYC City Hall
  [-73.9857, 40.7484], // Empire State Building
  [-73.9772, 40.7527], // Grand Central
  [-73.9654, 40.7829], // Central Park
] as [number, number][];

const stops = [
  { name: "City Hall", lng: -74.006, lat: 40.7128 },
  { name: "Empire State Building", lng: -73.9857, lat: 40.7484 },
  { name: "Grand Central Terminal", lng: -73.9772, lat: 40.7527 },
  { name: "Central Park", lng: -73.9654, lat: 40.7829 },
];

export function RouteExample() {
  return (
    <Card className="h-[400px] w-full overflow-hidden p-0">
      <Map center={[-73.98, 40.75]} zoom={11.2}>
        <MapRoute
          coordinates={route}
          color="hsl(var(--primary))"
          width={4}
          opacity={0.8}
        />

        {stops.map((stop, index) => (
          <MapMarker key={stop.name} longitude={stop.lng} latitude={stop.lat}>
            <MarkerContent>
              <div className="flex size-5 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-semibold text-primary-foreground shadow-lg">
                {index + 1}
              </div>
            </MarkerContent>
            <MarkerTooltip>{stop.name}</MarkerTooltip>
          </MapMarker>
        ))}
      </Map>
    </Card>
  );
}
