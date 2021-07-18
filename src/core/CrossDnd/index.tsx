import { createContext, FC } from "react";
import { Object3D } from "three";

type DndTarget = Object3D | object;

interface DndContextValue {
    current?: DndTarget;
}

export const DndContext = createContext<DndContextValue>({});

export const CrossDnd: FC = ({ children }) => {
    return (
        <DndContext.Provider value={{}}>
            {children}
        </DndContext.Provider>
    )
}