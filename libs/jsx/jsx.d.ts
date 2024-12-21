import { ElementType, Props, VirtualDOM } from "./types";
import { Fragment } from "./createElement";

// 글로벌 JSX 네임스페이스 확장
declare global {
  namespace JSX {
    // JSX 요소의 반환 타입
    type Element = VirtualDOM;

    /**
     * JSX IntrinsicElements 정의
     * HTML 태그 지원
     */
    interface IntrinsicElements {
      [elemName: string]: Props;
    }

    // JSX Fragment 타입 정의
    type Fragment = typeof Fragment;
  }
}
