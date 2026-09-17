import { createFileRoute } from "@tanstack/react-router";
import CheckOut from "../pages/CheckOut";

export const Route = createFileRoute("/check-out")({
  component: CheckOut,
});
