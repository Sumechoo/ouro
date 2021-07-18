import { MutableRefObject, useCallback, useContext, useEffect } from "react";
import { Object3D } from "three";
import { DndContext } from "..";

export const useDnD = (ref: MutableRefObject<Object3D>) => {
    const {} = useContext(DndContext);

    const startDrag = useCallback(() => {
        ref.current.visible = false;
    }, []);

    const stopDrag = useCallback(() => {
        ref.current.visible = true;
    }, []);

    useEffect(() => {
        document.addEventListener('pointerup', stopDrag);

        return () => document.removeEventListener('pointerup', stopDrag);
    }, [stopDrag]);

    return [startDrag];
}