import { render } from "libs/render/render";
import App from "src/App";

type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<S> = (action: SetStateAction<S>) => void;

const stateContainer: { stateStore: any[]; currentIndex: number } = {
  stateStore: [],
  currentIndex: 0,
};

export function useState<S>(initialState: S): [S, Dispatch<S>] {
  const currentIndex = stateContainer.currentIndex;

  // 초기 상태 설정
  if (stateContainer.stateStore[currentIndex] === undefined) {
    stateContainer.stateStore[currentIndex] = initialState;
  }

  const state = stateContainer.stateStore[currentIndex];

  // 상태 업데이트 함수
  const setState: Dispatch<S> = (action: SetStateAction<S>) => {
    const nextState =
      typeof action === "function"
        ? (action as (prevState: S) => S)(state)
        : action;

    stateContainer.stateStore[currentIndex] = nextState;
    // 현재 컴포넌트를 다시 호출 (리렌더링)
    reRender();
  };

  stateContainer.currentIndex++; // 다음 호출을 위해 인덱스 증가
  return [state, setState];
}

const resetStateIndex = () => {
  stateContainer.currentIndex = 0;
};

function reRender() {
  resetStateIndex();

  const root = document.getElementById("root") as HTMLElement;
  root.innerHTML = "";
  render(App(), root);
}
