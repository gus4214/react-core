export function createElement(type, props, ...children) {
  props = props || {};

  // children을 props.children에 할당
  // children이 하나의 값일 수도 있으므로 조건문 처리
  if (children.length === 1) {
    props.children = children[0];
  } else if (children.length > 1) {
    props.children = children;
  }

  return { type, props };
}
