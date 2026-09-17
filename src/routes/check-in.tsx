import { createFileRoute } from "@tanstack/react-router";
import CheckIn from "../pages/CheckIn";

export const Route = createFileRoute("/check-in")({
  component: CheckIn,
});
