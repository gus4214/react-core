import { Fragment } from "./createElement";

export type ElementType =
  | keyof HTMLElementTagNameMap
  | ((props: any) => VirtualDOM)
  | typeof Fragment;

export type Props = Record<string, unknown> | null;

export type Child =
  | string
  | number
  | TextElement
  | VirtualDOM
  | null
  | undefined
  | boolean;

export type TextElement = {
  type: "TEXT_ELEMENT";
  props: {
    nodeValue: string;
  };
};

export type VirtualDOM = {
  type: ElementType;
  props?: Props & { children?: VirtualDOM | VirtualDOM[] };
};

export type Element = VirtualDOM | (TextElement | VirtualDOM)[];
