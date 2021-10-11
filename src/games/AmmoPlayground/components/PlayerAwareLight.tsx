import { useFrame } from "@react-three/fiber";
import { FC, useRef, useEffect } from "react"
import { DirectionalLight, Vector2 } from "three";
import { useLevelEditor } from "../../../core/components/LevelEditor/useLevelEditor";

export const PlayerAwareLight: FC = () => {
    const lightRef = useRef<DirectionalLight>(null);
    const {player} = useLevelEditor();

    useEffect(() => {
        if(lightRef.current) {


            if(player) {
                lightRef.current.target = player;
            }

            lightRef.current.shadow.camera.top = 15;
            lightRef.current.shadow.camera.bottom = -15;
            lightRef.current.shadow.camera.right = 15;
            lightRef.current.shadow.camera.left = -15;

            lightRef.current.shadow.bias = 0.0002;
            lightRef.current.shadow.normalBias = 0.1;

            lightRef.current.castShadow = true;

            lightRef.current.shadow.mapSize = new Vector2(2048, 2048);
        }
    }, [lightRef, player]);

    useFrame(() => {
        if(lightRef.current && player) {
            lightRef.current.position.set(
                player.position.x - 16,
                player.position.y + 12,
                player.position.z + 12,
            );
        }
    })

    return (
        <directionalLight
            ref={lightRef}
            color={0xFF5A00}
            intensity={0.8}
            position={[0,0,0]}
        />
    )
}