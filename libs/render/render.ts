import { VirtualDOM } from "libs/jsx/types";
import { setAttributes } from "libs/render/attributes";

export const render = (virtualDOM: VirtualDOM, container: HTMLElement) => {
  // 1. virtualDOM이 null이면 함수 종료
  if (!virtualDOM) return;

  // 2. 텍스트 노드 생성 및 추가
  if (typeof virtualDOM === "string" || typeof virtualDOM === "number") {
    const textNode = document.createTextNode(String(virtualDOM));
    container.appendChild(textNode);
    return;
  }

  // 3. Fragment 처리: 자식 요소를 순회하며 렌더링
  if (!virtualDOM.type) {
    const children = Array.isArray(virtualDOM.props.children)
      ? virtualDOM.props.children
      : [virtualDOM.props.children];
    children.forEach((child) => render(child as VirtualDOM, container));
    return;
  }

  // 4. 일반 노드 생성: type에 따라 DOM 요소 생성
  const domNode = document.createElement(
    virtualDOM.type as keyof HTMLElementTagNameMap
  );

  // 5. 속성 설정 (이벤트리스터, 일반 속성)
  if (virtualDOM.props) {
    setAttributes(domNode, virtualDOM.props);
  }

  // 6. 자식 노드 렌더링: children 속성 처리
  const children = Array.isArray(virtualDOM.props.children)
    ? virtualDOM.props.children
    : [virtualDOM.props.children];

  children.forEach((child) => render(child as VirtualDOM, domNode));

  // 7. 생성된 노드를 컨테이너에 추가
  container.appendChild(domNode);
};
