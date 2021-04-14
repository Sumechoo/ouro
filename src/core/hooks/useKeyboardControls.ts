import { WorkerApi } from "@react-three/cannon";
import { useCallback, useEffect } from "react";

export const useKeyboardControls = (api: WorkerApi) => {
    const keyDownListener = useCallback((event: KeyboardEvent) => {
        switch(event.key) {
            case 'w':
                api.velocity.set(0, 2, -10);
                break;
            case 's':
                api.velocity.set(0, 2, 10);
                break;
            case 'a':
                api.velocity.set(-10, 2, 0);
                break;
            case 'd':
                api.velocity.set(10, 2, 0);
                break;
        }
    }, [api]);

    useEffect(() => {
        document.addEventListener('keydown', keyDownListener);

        return () => {
            document.removeEventListener('keydown', keyDownListener);
        }
    }, [keyDownListener]);
};
