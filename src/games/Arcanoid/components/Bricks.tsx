import { useBox } from "@react-three/cannon";
import { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useArcanoidStore } from "..";
import { bounceMaterial } from "../constants";

enum BrickType {
    BASIC, DANGER
}

interface BrickPosition {
    position: number[];
    type: BrickType;
    id: string;
}

interface BrickProps {
    onDestroy: (id: string) => void;
    position: BrickPosition;
}

const brickGeometry = <boxGeometry />;
const brickMaterialMap: Record<BrickType, any> = {
    [BrickType.BASIC]: <meshPhongMaterial color='gray' />,
    [BrickType.DANGER]: <meshPhongMaterial color='red' />
}

const Brick: FC<BrickProps> = ({position, onDestroy}) => {
    const { type } = position;
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
            scale={[size, 0.8 + Math.random() * 5, size]}
        >
            {brickMaterialMap[type]}
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
                            type: BrickType.BASIC,
                            position: [index - 4, 0, y - 3],
                        });
                        break;
                    case 'r':
                        positionsArray.push({
                            id: `brick-${itemIndex}`,
                            type: BrickType.DANGER,
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
