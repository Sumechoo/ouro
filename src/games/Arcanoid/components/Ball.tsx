import { useSphere } from "@react-three/cannon";
import { FC, useEffect } from "react";
import { useArcanoidStore } from "..";
import { bounceMaterial } from "../constants";

export const Ball: FC = () => {
    const { setLevel } = useArcanoidStore();
    const [ref, api] = useSphere(() => ({
        mass: 0.00000000001,
        args: 0.2,
        fixedRotation: true,
        material: bounceMaterial,
    }));

    useEffect(() => {
        api.velocity.set(Math.random() * 2,0,-10);
    }, [api]);

    useEffect(() => {
        api.velocity.subscribe(([x,y,z]) => api.velocity.set(x,0,z));
        api.position.subscribe(([x,y,z]) => {
            api.position.set(x,0,z);

            if (z > 9) {
                setLevel(-1);
            }
        });
    }, [api, setLevel]);

    return (
        <mesh
            ref={ref}
            castShadow
            receiveShadow
        >
            <sphereGeometry args={[0.2,10,10]} />
            <meshStandardMaterial color='#F76242' />
        </mesh>
    );
};
