import { FC, createContext, Suspense, useMemo } from 'react';
import { DoubleSide, Material, MeshDepthMaterial, MeshPhysicalMaterial, NearestFilter, RGBADepthPacking, TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

interface ResourceContextValue {
    materials: Material[];
    depthMaterial: MeshDepthMaterial;
}

export const ResourceContext = createContext<ResourceContextValue>({} as any);

const ResourceContextSuspended: FC = ({children}) => {
    const textureUrl = './assets/textures/texture.png';
    const [ colorMap ] = useLoader(TextureLoader, [textureUrl]);

    const resources = useMemo(() => {
        colorMap.magFilter = NearestFilter;

        return {
            materials: [
                new MeshPhysicalMaterial({
                    map: colorMap,
                    transparent: true,
                    side: DoubleSide,
                    alphaTest: 0.5,
                }),
            ],
            depthMaterial: new MeshDepthMaterial({
                map: colorMap,
                alphaTest: 0.3,
                depthPacking: RGBADepthPacking,
            })
        }
    }, [colorMap]);

    return (
        <ResourceContext.Provider value={resources}>
            {children}
        </ResourceContext.Provider>
    )
};

export const ResourceContextProvider: FC = ({children}) => {
    return (
        <Suspense fallback={null}>
            <ResourceContextSuspended>
                {children}
            </ResourceContextSuspended>
        </Suspense>
    )
}
