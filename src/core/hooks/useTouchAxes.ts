import { useCallback, useEffect, RefObject, useState } from "react";
import { Point } from "../types";
import { useAxesState } from "./useAxesState";

export interface TouchItem {
    id: number;
    position: Point;
    movement: Point;
    initial: Point;
    delta: Point;
    side: 'left' | 'right';
}

const ZERO_POINT: Point = {
    x: 0, y: 0,
}

export const useTouchAxes = (ref: RefObject<HTMLElement>) => {
    const {setTouches, touches} = useAxesState();

    const handleTouchStart = useCallback((e: TouchEvent) => {
        e.preventDefault();
        const {changedTouches} = e;
        const prevTouches = [...touches];

        for(let i = 0; i < changedTouches.length; i++) {
            const touch = changedTouches.item(i);
            const targetPrevTouch = prevTouches.find((item) => item.id === touch?.identifier);

            if (!targetPrevTouch && touch) {
                prevTouches.push({
                    id: touch?.identifier,
                    position: {
                        x: touch.clientX,
                        y: touch.clientY,
                    },
                    initial: {
                        x: touch.clientX,
                        y: touch.clientY,
                    },
                    movement: {...ZERO_POINT},
                    delta: {...ZERO_POINT},
                    side: touch.clientX < window.innerWidth / 2 ? 'left' : 'right',
                });
            }
        }

        setTouches(prevTouches);
    }, [touches, setTouches]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        const {changedTouches} = e;
        const prevTouches = [...touches];

        for(let i = 0; i < changedTouches.length; i++) {
            const touch = changedTouches.item(i);
            const prevTargetTouch = prevTouches.find((item) => item.id === touch?.identifier);

            if (prevTargetTouch && touch) {
                prevTargetTouch.movement.x = touch.clientX - prevTargetTouch.position.x;
                prevTargetTouch.movement.y = touch.clientY - prevTargetTouch.position.y;
                prevTargetTouch.delta.x = prevTargetTouch.initial.x - touch.clientX;
                prevTargetTouch.delta.y = prevTargetTouch.initial.y - touch.clientY;
                prevTargetTouch.position.x = touch.clientX;
                prevTargetTouch.position.y = touch.clientY;
            }
        }

        setTouches(prevTouches);
    }, [touches, setTouches]);

    const handleTouchEnd = useCallback((e: TouchEvent) => {
        const {changedTouches} = e;
        let prevTouches = [...touches];

        for(let i = 0; i < changedTouches.length; i++) {
            const touch = changedTouches.item(i);
            prevTouches = prevTouches.filter((item) => item.id !== touch?.identifier);
        }

        setTouches(prevTouches);
    }, [touches, setTouches]);

    useEffect(() => {
        ref.current?.addEventListener('touchstart', handleTouchStart);
        ref.current?.addEventListener('touchmove', handleTouchMove);
        ref.current?.addEventListener('touchend', handleTouchEnd);

        return () => {
            ref.current?.removeEventListener('touchstart', handleTouchStart);
            ref.current?.removeEventListener('touchmove', handleTouchMove);
            ref.current?.removeEventListener('touchend', handleTouchEnd);
        }
    }, [handleTouchStart, handleTouchEnd, handleTouchMove]);
}