import { useSphere } from "@react-three/cannon";
import { FC, useEffect, useRef } from "react";
import { useArcanoidStore } from "..";
import { bounceMaterial } from "../constants";

const MIN_SPEED = 8;

export const Ball: FC = () => {
    const ignoreSubscriptionRef = useRef(true);
    const { setLevel, currentLevel } = useArcanoidStore();
    const [ref, api] = useSphere(() => ({
        mass: 0.00000000001,
        args: 0.2,
        fixedRotation: true,
        material: bounceMaterial,
    }));

    useEffect(() => {
        ignoreSubscriptionRef.current = true;

        api.velocity.set(0,0,1);
        api.position.set(0,0,2);
    }, [api, currentLevel]);

    useEffect(() => {
        api.velocity.subscribe(([x,y,z]) => {
            if (ignoreSubscriptionRef.current) {
                return;
            }

            const needToSpeedup = Math.abs(x) < MIN_SPEED && Math.abs(z) < MIN_SPEED;

            api.velocity.set(
                needToSpeedup ? x * 1.1 : x,
                0,
                needToSpeedup ? z * 1.1 : z,
            )
        });
        api.position.subscribe(([x,y,z]) => {
            if (ignoreSubscriptionRef.current) {
                ignoreSubscriptionRef.current = false;
                return;
            }

            api.position.set(x,0,z);

            if (z > 9) {
                setLevel(-1);
            }
        });
    }, [api, setLevel, ignoreSubscriptionRef]);

    return (
        <mesh
            ref={ref}
            castShadow
            receiveShadow
        >
            <sphereGeometry args={[0.2,10,10]} />
            <meshStandardMaterial color='#F76242' />
            <pointLight
                position={[0, 1, 0]}
                intensity={2}
                distance={7}
                color='orange'
                castShadow
            />
        </mesh>
    );
};
