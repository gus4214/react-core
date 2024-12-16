// src/jsxRuntime/jsx-runtime.js
export function jsx(type, props, key) {
  return { type, props, key };
}

export function jsxs(type, props, key) {
  return { type, props, key };
}

export const Fragment = (props) => props.children;
