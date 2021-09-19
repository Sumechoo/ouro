import {FC, createContext, useRef} from 'react';

import {useTouchAxes, TouchItem} from '../hooks/useTouchAxes';

interface AxisContextValue {
    touches: TouchItem[];
}

export const AxisContext = createContext<AxisContextValue>({} as any);

export const AxisProvider: FC = ({children}) => {
    const eventsProviderRef = useRef<HTMLDivElement>(null);
    
    useTouchAxes(eventsProviderRef);

    return (
        <div ref={eventsProviderRef}>
            {children}
        </div>
    );
};
