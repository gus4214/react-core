import {
  Child,
  ElementType,
  Props,
  VirtualDOM,
  TextElement,
  Element,
} from "./types";

export const Fragment = Symbol("Fragment");

export function createElement(
  type: ElementType,
  props?: Props,
  ...children: Child[]
): Element {
  props = props || {};

  const flatChildren = children
    // 1. 중첩된 배열 평탄화
    .flat(Infinity)
    // 2. falsy 값(null, undefined, boolean) 제거
    .filter((child) => child != null && typeof child !== "boolean")
    // 3. 문자열/숫자 children을 TEXT_ELEMENT로 변환
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return {
          type: "TEXT_ELEMENT",
          props: { nodeValue: String(child) },
        } as TextElement;
      }
      return child as VirtualDOM;
    });

  if (type === Fragment) {
    return flatChildren;
  }

  // children 배열 길이에 따라 props.children 설정
  props.children = flatChildren.length === 1 ? flatChildren[0] : flatChildren;

  // 함수형 컴포넌트 처리
  if (typeof type === "function") {
    return type(props);
  }

  return { type, props };
}
