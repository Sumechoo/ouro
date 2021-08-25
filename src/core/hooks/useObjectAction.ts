import { MutableRefObject, useEffect } from "react"
import { Object3D } from "three"

export enum ObjectActionType {
    TEST_1,
    TEST,
}

export const useObjectAction = (ref: MutableRefObject<Object3D>, type: ObjectActionType) => {
    useEffect(() => {
        ref.current.userData.action = {
            type,
        };
    }, [ref, type]);
}