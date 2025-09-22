# Info

A collection of useful React hooks.

# Contents

- [useOutsideClick](#useoutsideclick)
  - [Simple usage](#simple-usage)
  - [`enabled` option](#with-enabled-option)
  - [`exclude` option](#with-exclude-option)

# Installation

```bash
bun add @mirum7/hooks
```

# Usage

## `useOutsideClick()`

A hook that detects clicks outside of a specified element and triggers a callback function.

### Example

#### Simple usage:

```tsx
import { useOutsideClick } from "@mirum7/hooks";

const MyComponent = () => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref,
    callback: () => {
      console.log("Clicked outside!");
    },
  });

  return <div ref={ref}>Click outside me!</div>;
};
```

#### With `enabled` option:

```tsx
import { useOutsideClick } from "@mirum7/hooks";

const MyComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(true);

  useOutsideClick({
    ref,
    callback: () => {
      console.log("Clicked outside!");
    },
    enabled: isEnabled,
  });

  return (
    <div>
      <div ref={ref}>Click outside me!</div>

      <button onClick={() => setIsEnabled((prev) => !prev)}>
        {isEnabled ? "Disable" : "Enable"} Outside Click Detection
      </button>
    </div>
  );
};
```

#### With `exclude` option:

```tsx
import { useOutsideClick } from "@mirum7/hooks";
import { useRef, useState } from "react";

const MyComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const excludeRef = useRef<HTMLButtonElement>(null);
  const [isEnabled, setIsEnabled] = useState(true);

  useOutsideClick({
    ref,
    callback: () => {
      console.log("Clicked outside!");
    },
    enabled: isEnabled,
    exclude: [excludeRef, "[data-ignore-outside-click]"],
  });

  return (
    <div>
      <div ref={ref}>Click outside me!</div>

      <button ref={excludeRef}>
        Clicking me won't trigger the outside click
      </button>
    </div>
  );
};
```
