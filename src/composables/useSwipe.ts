import type { Ref, ComputedRef } from 'vue';
import { reactive, computed, onMounted, ref, watch } from 'vue';

export type UseSwipeDirection = 'up' | 'down' | 'left' | 'right' | 'none';
export type UseSwipeDeviceType = 'touch' | 'mouse';
export interface Position {
  x: number;
  y: number;
}
export interface UseSwipeReturn {
  direction: ComputedRef<UseSwipeDirection>;
}

export interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

enum UseSwipeTouchEvents {
  START = 'touchstart',
  MOVE = 'touchmove',
  END = 'touchend',
  CANCEL = 'touchcancel',
}

export function useSwipe<T>(target: Ref<T> | null, options?: UseSwipeOptions): UseSwipeReturn {
  const { onSwipeLeft, onSwipeRight } = options ?? {};
  const coordsStart: Position = reactive({ x: 0, y: 0 });
  const coordsEnd: Position = reactive({ x: 0, y: 0 });

  const diffX: ComputedRef<number> = computed(() => coordsStart.x - coordsEnd.x);
  const diffY: ComputedRef<number> = computed(() => coordsStart.y - coordsEnd.y);

  const { abs } = Math;

  const direction: ComputedRef<UseSwipeDirection> = computed(() => {
    if (abs(diffX.value) > abs(diffY.value)) {
      return diffX.value > 0 ? 'left' : 'right';
    } else {
      return diffY.value > 0 ? 'up' : 'down';
    }
  });

  watch(
    () => direction.value,
    (newDirection) => {
      if (newDirection === 'left') {
        onSwipeLeft?.();
      } else if (newDirection === 'right') {
        onSwipeRight?.();
      }
    },
  );

  const getTouchEventCoords = (e: TouchEvent): [number, number] => [e.touches[0].clientX, e.touches[0].clientY];

  const updateCoordsStart = (x: number, y: number): void => {
    coordsStart.x = x;
    coordsStart.y = y;
  };

  const updateCoordsEnd = (x: number, y: number): void => {
    coordsEnd.x = x;
    coordsEnd.y = y;
  };

  let listenerOptions: { passive?: boolean; capture?: boolean };

  const isSwiping: Ref<boolean> = ref(false);

  const touchStart = (e: TouchEvent): void => {
    if (e.touches.length !== 1) return;

    const [x, y] = getTouchEventCoords(e);

    updateCoordsStart(x, y);
    updateCoordsEnd(x, y);
  };

  const touchMove = (e: TouchEvent): void => {
    if (e.touches.length !== 1) return;
    const [x, y] = getTouchEventCoords(e);
    updateCoordsEnd(x, y);
    if (!isSwiping.value) isSwiping.value = true;
  };

  const touchEnd = (): void => {
    isSwiping.value = false;
  };

  const deviceType: Ref<UseSwipeDeviceType> = ref('mouse');
  const isTouchDevice = (): boolean => {
    try {
      document.createEvent('TouchEvent');
      deviceType.value = 'touch';
      return true;
    } catch (e) {
      deviceType.value = 'mouse';
      return false;
    }
  };
  isTouchDevice();

  onMounted(() => {
    if (target?.value instanceof HTMLElement) {
      if (deviceType.value === 'mouse') return;
      target.value.addEventListener(UseSwipeTouchEvents.START, touchStart, listenerOptions);
      target.value.addEventListener(UseSwipeTouchEvents.MOVE, touchMove, listenerOptions);
      target.value.addEventListener(UseSwipeTouchEvents.END, touchEnd, listenerOptions);
      target.value.addEventListener(UseSwipeTouchEvents.CANCEL, touchEnd, listenerOptions);
    }
  });

  return {
    direction,
  };
}
