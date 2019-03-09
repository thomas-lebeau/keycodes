import { useEffect } from 'preact/hooks';

export default function useEventListener(eventName, listener) {
    useEffect(() => {
        document.addEventListener(eventName, listener);

        return () => document.removeEventListener(eventName, listener);
    });
}
