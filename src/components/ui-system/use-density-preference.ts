import * as React from "react";

export type DensityMode = "default" | "compact";

const STORAGE_KEY = "straight6ui:density-mode";

function getInitialDensity(): DensityMode {
  if (typeof window === "undefined") return "default";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "compact" ? "compact" : "default";
}

export function useDensityPreference() {
  const [density, setDensity] = React.useState<DensityMode>(getInitialDensity);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, density);
  }, [density]);

  const toggleDensity = React.useCallback(() => {
    setDensity((prev) => (prev === "default" ? "compact" : "default"));
  }, []);

  return { density, setDensity, toggleDensity };
}
