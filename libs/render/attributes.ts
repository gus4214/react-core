interface HandleAttributeParams<T> {
  domNode: HTMLElement;
  name: string;
  value: T;
}
// WeakMap을 사용하여 이벤트리스너 추적, DOM에서 노드가 제거되면 자동으로 메모리에서 삭제.
// HTMLElement를 변경하지 않아도 되므로 DOM 노드의 원래 상태를 유지.
const eventListenerMap = new WeakMap<
  HTMLElement,
  Record<string, EventListener>
>();

// 1. Boolean 속성 처리
// - HTML의 Boolean 속성(예: checked, disabled, readonly)은 값이 true때만 DOM에 존재해야함.
const handleBooleanAttribute = (params: HandleAttributeParams<boolean>) => {
  const { domNode, name, value } = params;
  if (value) {
    domNode.setAttribute(name, "");
  } else {
    domNode.removeAttribute(name);
  }
};

// 2. 스타일 객체 분리
// - React의 style 속성은 문자열 대신 객체로 설정됨.
// - style 객체를 순회하며 각각의 스타일 속성을 DOM에 개발적으로 추가하기
const handleStyleAttribute = (
  params: HandleAttributeParams<Record<string, string>>
) => {
  const { domNode, value } = params;
  Object.keys(value).forEach(
    (styleName) => ((domNode.style as any)[styleName] = value[styleName])
  );
};

// 3. 클래스 이름 처리
// - React는 className을 표준 HTML의 class 속성으로 변환.
const handleClassNameAttribute = (params: HandleAttributeParams<string>) => {
  const { domNode, value } = params;
  domNode.setAttribute("class", value);
};

// 4. 이벤트 리스너 처리
// - 중복 이벤트 리스너를 방지하기 위해 이전 이벤트를 제거하고 새로운 리스너 추가하기
//     - DOM에 동일한 이벤트 리스너가 여러 번 등록되는 경우 -> 동일한 이벤트가 여러 번 처리되어 성능 문제, 오류 발생 가능
const handleEventListener = (params: HandleAttributeParams<EventListener>) => {
  const { domNode, name, value: listener } = params;

  const eventType = name.toLowerCase().substring(2);

  // 기존 이벤트 리스너 제거
  const existingListeners = eventListenerMap.get(domNode) || {};
  if (existingListeners[eventType]) {
    domNode.removeEventListener(eventType, existingListeners[eventType]);
  }

  // 새로운 이벤트 리스너 추가
  domNode.addEventListener(eventType, listener);

  // 이벤트 리스너 저장
  eventListenerMap.set(domNode, {
    ...existingListeners,
    [eventType]: listener,
  });
};

// 일반 속성 처리
const handleGeneralAttribute = (params: HandleAttributeParams<string>) => {
  const { domNode, name, value } = params;
  domNode.setAttribute(name, value);
};

import { Props } from "libs/jsx/types";

const attributeHandlerMap = {
  boolean: handleBooleanAttribute,
  style: handleStyleAttribute,
  className: handleClassNameAttribute,
  event: handleEventListener,
  general: handleGeneralAttribute,
} as Record<string, (params: HandleAttributeParams<any>) => void>;

const determineAttributeValue = (
  name: string,
  value: unknown
): keyof typeof attributeHandlerMap => {
  if (typeof value === "boolean") return "boolean";
  if (name === "style" && typeof value === "object") return "style";
  if (name === "className") return "className";
  if (name.startsWith("on")) return "event";
  return "general";
};

export const setAttributes = (domNode: HTMLElement, props: Props) => {
  Object.keys(props)
    .filter((key) => key !== "children")
    .forEach((name: string) => {
      const value = props[name];
      const attributeKey = determineAttributeValue(name, value);
      attributeHandlerMap[attributeKey]({ domNode, name, value });
    });
};
