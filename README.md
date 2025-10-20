# Info

A collection of useful React hooks.

# Contents

- [useDebounce](#usedebounce)
  - [Simple usage](#simple-usage-0)
  - [With clear function](#with-clear-function)
- [useOutsideClick](#useoutsideclick)
  - [Simple usage](#simple-usage-1)
  - [`enabled` option](#with-enabled-option)
  - [`exclude` option](#with-exclude-option)

# Installation

```bash
bun add @mirum7/hooks
```

# Usage

## `useDebounce()`

A hook that creates a debounced version of a function, delaying its execution until after a specified wait time has passed since the last time it was invoked.

### Example

#### Simple usage:

```tsx
import { useDebounce } from "@mirum7/hooks";

const MyComponent = () => {
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const { fn: debouncedSearch } = useDebounce({
    fn: handleSearch,
    wait: 500, // Wait 500ms after last call
  });

  return (
    <input
      type="text"
      onChange={(e) => debouncedSearch(e.target.value)}
      placeholder="Type to search..."
    />
  );
};
```

#### With clear function:

```tsx
import { useDebounce } from "@mirum7/hooks";

const MyComponent = () => {
  const handleSave = (data: string) => {
    console.log("Saving:", data);
  };

  const { fn: debouncedSave, clear } = useDebounce({
    fn: handleSave,
    wait: 2000,
  });

  return (
    <div>
      <input onChange={(e) => debouncedSave(e.target.value)} />
      <button onClick={clear}>Cancel Save</button>
    </div>
  );
};
```

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
