import { lazy, ComponentType, LazyExoticComponent } from "react";

export type ReactLazyFactory<T = any> = () => Promise<{
  default: ComponentType<T>;
}>;

export type ComponentPreloadArray<T = any> = [
  component: LazyExoticComponent<ComponentType<T>>,
  preloadFn: () => void
];

export function getLazyComponentWithPreload<T = any>(
  componentPath: string
): ComponentPreloadArray<T>;
export function getLazyComponentWithPreload<T = any>(
  factory: ReactLazyFactory<T>
): ComponentPreloadArray<T>;
export function getLazyComponentWithPreload<T = any>(
  input: string | ReactLazyFactory<T>
): ComponentPreloadArray<T> {
  const factory = () => (typeof input === "string" ? import(input) : input());

  const lazyComponent = lazy(factory);
  const preloadFunction = factory;
  
  return [lazyComponent, preloadFunction];
}
