import { Vector3 } from "@react-three/fiber";
import { createContext, FC, useCallback, useState, useMemo } from "react";

import { InstanceMesh } from './InstanceMesh';

interface InstancingContextValue {
    addInstance: (geometry: string, at: Vector3) => number;
}

export const InstancingContext = createContext<InstancingContextValue>({} as any);

export const InstancingContextProvider: FC = ({children}) => {
    const [instances, setInstances] = useState<Record<string, Vector3[]>>({
        tree: [],
        pine: [],
    });
    const instanceEntries = useMemo(() => Object.entries(instances), [instances]);

    const addInstance = useCallback((geometry: string, at: Vector3) => {
        const newInstances = {...instances};

        let index = 0;

        if(newInstances[geometry]) {
            index = newInstances[geometry].push(at);
        } else {
            newInstances[geometry] = [at];
        }

        setInstances(newInstances);

        console.info(newInstances);

        return index;
    }, [instances]);

    return (
        <InstancingContext.Provider value={{
            addInstance,
        }}>
            {children}
            {instanceEntries.map(([name, positions]) => (
                <InstanceMesh
                    key={name}
                    name={name}
                    positions={positions}
                />
            ))}
        </InstancingContext.Provider>
    )
}