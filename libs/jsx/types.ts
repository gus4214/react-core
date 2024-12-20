import { Fragment } from "./createElement";

export type ElementType =
  | keyof HTMLElementTagNameMap
  | ((props: any) => VirtualDOM)
  | typeof Fragment;

export type Props = Record<string, unknown>;

export type Child = string | number | VirtualDOM | null | undefined | boolean;

export type VirtualDOM = {
  type?: ElementType;
  props: Props & { children?: VirtualDOM | VirtualDOM[] };
};

export type Element = VirtualDOM | VirtualDOM[];
