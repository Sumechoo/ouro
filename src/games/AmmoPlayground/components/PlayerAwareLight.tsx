import { useFrame, useThree } from "@react-three/fiber";
import { FC, useRef, useEffect } from "react"
import { CameraHelper, DirectionalLight, Vector2 } from "three";
import { useLevelEditor } from "../../../core/components/LevelEditor/useLevelEditor";

export const PlayerAwareLight: FC = () => {
    const lightRef = useRef<DirectionalLight>(null);
    const {player} = useLevelEditor();
    const scene = useThree(({scene}) => scene);

    useEffect(() => {
        if(lightRef.current) {

            // scene.add(new CameraHelper(lightRef.current.shadow.camera));

            if(player) {
                lightRef.current.target = player;
            }

            lightRef.current.shadow.camera.top = 15;
            lightRef.current.shadow.camera.bottom = -15;
            lightRef.current.shadow.camera.right = 15;
            lightRef.current.shadow.camera.left = -15;


            lightRef.current.shadow.mapSize = new Vector2(1025, 1024);
        }
    }, [lightRef, player]);

    useFrame(() => {
        if(lightRef.current && player) {
            lightRef.current.position.set(
                player.position.x + 8,
                player.position.y + 16,
                player.position.z - 6,
            );
        }
    })

    return (
        <directionalLight
            ref={lightRef}
            castShadow
            color="orange"
            intensity={2}
            position={[1, 2, 3]}
        />
    )
}