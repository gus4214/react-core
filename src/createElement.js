export function createElement(type, props, ...children) {
  props = props || {};

  // 1. 중첩된 배열 평탄화
  let flatChildren = children.flat(Infinity);

  // 2. falsy 값(null, undefined, boolean) 제거
  flatChildren = flatChildren.filter(
    (child) => child != null && typeof child !== "boolean"
  );

  // 3. 문자열/숫자 children을 TEXT_ELEMENT로 변환
  flatChildren = flatChildren.map((child) => {
    if (typeof child === "string" || typeof child === "number") {
      return {
        type: "TEXT_ELEMENT",
        props: { nodeValue: String(child) },
      };
    }
    return child;
  });

  // children 배열 길이에 따라 props.children 설정
  if (flatChildren.length === 1) {
    props.children = flatChildren[0];
  } else if (flatChildren.length > 1) {
    props.children = flatChildren;
  }

  // 함수형 컴포넌트 처리
  if (typeof type === "function") {
    return type(props);
  }

  return { type, props };
}
