import { useEffect } from "react";

type Exclude = React.RefObject<HTMLElement> | Element | string | Exclude[];

interface Props {
  ref: React.RefObject<HTMLElement>;
  callback: (e: MouseEvent) => void;
  enabled?: boolean;
  exclude?: Exclude;
}

const getExcludedElements = (exclude: Exclude): Element[] => {
  if (Array.isArray(exclude)) {
    return exclude.flatMap(getExcludedElements);
  }

  if (typeof exclude === "string") {
    return [...document.querySelectorAll(exclude)];
  }

  if (exclude instanceof Element) {
    return [exclude];
  }

  if (typeof exclude === "object") {
    return [exclude.current];
  }

  return [];
};

const checkIsExcludeContainsTarget = (
  elements: Element[],
  target: Node | null
) => elements.some((element) => element.contains(target));

export const useOutsideClick = (props: Props) => {
  const { ref, callback, enabled = true, exclude = [] } = props;

  useEffect(() => {
    const excludeElements = getExcludedElements(exclude);

    const handleMouseUp = (e: MouseEvent) => {
      callback(e);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;

      const isTarget = ref.current.contains(target);
      const isExclude = checkIsExcludeContainsTarget(excludeElements, target);

      if (isExclude || isTarget) {
        return;
      }

      window.addEventListener("mouseup", handleMouseUp, { once: true });
    };

    window.addEventListener("mousedown", handleMouseDown);

    return () => window.removeEventListener("mousedown", handleMouseDown);
  }, [ref.current, enabled, callback]);
};
