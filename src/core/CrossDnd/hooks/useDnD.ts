import { MutableRefObject, useCallback, useEffect } from "react";
import { Object3D } from "three";

export const useDnD = (ref: MutableRefObject<Object3D>) => {
    const startDrag = useCallback(() => {
        ref.current.visible = false;
    }, [ref]);

    const stopDrag = useCallback(() => {
        ref.current.visible = true;
    }, [ref]);

    useEffect(() => {
        document.addEventListener('pointerup', stopDrag);

        return () => document.removeEventListener('pointerup', stopDrag);
    }, [stopDrag]);

    return [startDrag];
}