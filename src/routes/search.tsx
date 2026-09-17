import { createFileRoute } from "@tanstack/react-router";
import ParkingSearch from "../pages/ParkingSearch";

export const Route = createFileRoute("/search")({
  component: ParkingSearch,
});
