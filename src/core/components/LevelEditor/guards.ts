import { Placement } from './types';

export const isPlacementItem = (item: any) : item is Placement => {
    return 'component' in item && 'props' in item;
}