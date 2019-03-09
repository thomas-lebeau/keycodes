import { h } from 'preact';
import { useEffect } from 'preact/hooks';

export const useEventListener = (eventName, listener) => {
  useEffect(() => {
    document.addEventListener(eventName, listener);

    return () => document.removeEventListener(eventName, listener)
  });
}
