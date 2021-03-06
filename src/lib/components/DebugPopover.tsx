import { Transition } from "@headlessui/react";
import { useMyStore } from "@lib/store";
import type { SerializedPost } from "@lib/types";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

const emptyArray: ReadonlyArray<number | string> = [];

function reduceByKeys<T>(object: T, keys: ReadonlyArray<number | string>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return keys.reduce<any>((acc, key) => {
    if (acc) {
      return acc[key];
    }
    return undefined;
  }, object);
}

const DebugPopover: React.FC<{ post: SerializedPost }> = ({ post }) => {
  const [open, setOpen] = useState(false);
  const [keys, setPostKeys] =
    useState<ReadonlyArray<number | string>>(emptyArray);
  const [storeKeys, setStoreKeys] = useState(emptyArray);
  const store = useMyStore();

  const toggleOpen = useCallback(() => {
    setOpen((o) => !o);
  }, []);

  const currentItem = useMemo(() => {
    return reduceByKeys(post, keys);
  }, [keys, post]);

  const currentItemPath = useMemo(() => {
    return ["post", ...keys].join(".");
  }, [keys]);

  const currentStoreItem = useMemo(() => {
    return reduceByKeys(store, storeKeys);
  }, [store, storeKeys]);

  const currentStoreItemPath = useMemo(() => {
    return ["store", ...storeKeys].join(".");
  }, [storeKeys]);

  useEffect(() => {
    if (currentItem !== post) {
      // eslint-disable-next-line no-console
      console.log(currentItemPath, currentItem);
    }
    if (currentItem === undefined) {
      setPostKeys(emptyArray);
    }
  }, [currentItem, currentItemPath, post]);

  useEffect(() => {
    if (currentStoreItem !== store) {
      // eslint-disable-next-line no-console
      console.log(currentStoreItemPath, currentStoreItem);
    }
    if (currentStoreItem === undefined) {
      setStoreKeys(emptyArray);
    }
  }, [currentStoreItem, currentStoreItemPath, store]);

  const postButtons = useMemo(() => {
    if (typeof currentItem === "string") {
      return [];
    }
    return Object.keys(currentItem).map((key, index) => (
      <button
        type="button"
        className="bg-slate-700 text-white hover:bg-slate-600 transition-all px-2 py-1 text-xs rounded"
        // eslint-disable-next-line react/no-array-index-key
        key={`post-${key}-${index}`}
        onClick={() => {
          setPostKeys((prevKeys) => [...prevKeys, key]);
        }}
      >
        {key}
      </button>
    ));
  }, [currentItem]);

  const storeButtons = useMemo(() => {
    return Object.entries(store)
      .filter(([, value]) => typeof value !== "function")
      .map(([key], index) => (
        <button
          type="button"
          className={twMerge(
            "bg-slate-700 text-white hover:bg-slate-600 transition-all px-2 py-1 text-xs rounded",
            storeKeys[0] === key && "bg-slate-500 hover:bg-slate-400"
          )}
          // eslint-disable-next-line react/no-array-index-key
          key={`store-${key}-${index}`}
          onClick={() => {
            setStoreKeys([key]);
          }}
        >
          {key}
        </button>
      ));
  }, [store, storeKeys]);

  return (
    <>
      <button type="button" onClick={toggleOpen}>
        ????????????
      </button>
      <Transition
        show={open}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className="absolute -translate-x-full translate-y-1/2 w-80 transform p-3 z-10 bg-white border shadow-md">
          <div className="flex flex-wrap gap-1 mb-4">
            <button
              type="button"
              className="bg-slate-700 text-white hover:bg-slate-600 transition-all px-2 py-1 text-xs rounded"
              onClick={() => {
                setPostKeys(emptyArray);
              }}
            >
              ?????????
            </button>
            <button
              type="button"
              className="bg-slate-700 text-white hover:bg-slate-600 transition-all px-2 py-1 text-xs rounded"
              onClick={() => {
                setPostKeys(["content", "data"]);
              }}
            >
              post.content.data
            </button>
          </div>
          <div className="flex flex-wrap gap-1 mb-4">
            {keys.map((key, index) => (
              <span
                className="bg-slate-100 px-1 py-0.5 text-xs rounded"
                // eslint-disable-next-line react/no-array-index-key
                key={`${key}-${index}`}
              >
                {key}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">{postButtons}</div>
          <hr className="my-10" />
          <p className="inline-flex gap-3 mb-3">
            <span>store</span>{" "}
            <button
              type="button"
              className="bg-slate-700 text-white hover:bg-slate-600 transition-all px-2 py-1 text-xs rounded"
              onClick={() => {
                setStoreKeys(emptyArray);
              }}
            >
              ?????????
            </button>
          </p>
          <div className="flex flex-wrap gap-1">{storeButtons}</div>
        </div>
      </Transition>
    </>
  );
};

export default memo(DebugPopover);
