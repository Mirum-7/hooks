import {
  type DebounceProps,
  type DebounceReturnProps,
  debounce,
} from "@mirum7/fn";
import { useCallback, useEffect } from "react";

export const useDebounce = (props: DebounceProps): DebounceReturnProps => {
  const { fn, clear } = useCallback(
    () => debounce(props),
    [props.fn, props.wait]
  )();

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  return {
    fn,
    clear,
  };
};
