// 상태값과 업데이트 함수를 반환하는 타입 정의
export type SetStateAction<S> = S | ((prevState: S) => S);
export type Dispatch<S> = (action: SetStateAction<S>) => void;
