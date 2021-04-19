import { useBox } from "@react-three/cannon";
import { FC, Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useArcanoidStore } from "..";
import { bounceMaterial } from "../constants";

interface BrickPosition {
    position: number[];
    id: string;
}

interface BrickProps {
    onDestroy: (id: string) => void;
    position: BrickPosition;
}

const brickGeometry = <boxGeometry />;
const brickMaterial = <meshPhongMaterial color='gray' />;

const Brick: FC<BrickProps> = ({position, onDestroy}) => {
    const incrementScores = useArcanoidStore((store) => store.incrementScores);

    const handleCollide = useCallback(() => {
        incrementScores();
        
        onDestroy(position.id);
    }, [incrementScores, onDestroy, position]);

    const size = 0.9;
    const [ref] = useBox(() => ({
        material: bounceMaterial,
        position: position.position,
        args: [size, 10, size],
        type: 'Kinematic',
        onCollide: handleCollide,
    }));
    
    return (
        <mesh
            ref={ref}
            castShadow
            receiveShadow
            scale={[size, 0.8, size]}
        >
            {brickMaterial}
            {brickGeometry}
        </mesh>
    )
}

interface Props {
    level: string;
}

export const Bricks: FC<Props> = ({level}) => {
    const {currentLevel, setLevel} = useArcanoidStore((store) => store);

    const initialPositions = useMemo(() => {
        const positionsArray: BrickPosition[] = [];

        let y = -2;
        let yIndexShift = 0;

        level
            .split('')
            .forEach((levelItem, itemIndex) => {
                let index = itemIndex - yIndexShift;

                switch(levelItem) {
                    case 'x':
                        positionsArray.push({
                            id: `brick-${itemIndex}`,
                            position: [index - 4, 0, y - 3],
                        });
                        break;
                    case ';':
                        y++;
                        yIndexShift = itemIndex + 1;
                        break;
                }
            })

        return positionsArray;
    }, [level]);
    
    const [positions, setPositions] = useState(initialPositions);

    useEffect(() => {
        if (positions.length === 0) {
            setLevel(currentLevel + 1);
        }
    }, [positions, setLevel, currentLevel]);

    const removeBrick = useCallback((idToDelete: string) => {
        setPositions(positions.filter(({id}) => id !== idToDelete))
    }, [positions]);

    return (
        <Fragment>
            {positions.map((position) => (
                position ? <Brick
                    key={Math.random()}
                    position={position}
                    onDestroy={removeBrick}
                /> : null
            ))}
        </Fragment>
    );
};
