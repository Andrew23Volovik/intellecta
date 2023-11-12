<script setup lang="ts">
import type { ComputedRef } from 'vue';
import type { ClassesRecord } from '@/types/types';
import type { ButtonProps, ButtonSizes } from '@/types/components/MclButton';
import { computed } from 'vue';

const props = withDefaults(defineProps<ButtonProps>(), {
  iconBtn: false,
  size: 'default',
  type: 'button',
});

defineEmits<{
  (e: 'click'): void;
}>();

const rippleTiming = 400;
const createRipple = ({ currentTarget, clientX, clientY }: MouseEvent): void => {
  const button = currentTarget as HTMLButtonElement;
  const circle = document.createElement('span');

  const position = button.getBoundingClientRect();

  const diameter: number = Math.max(button.clientWidth, button.clientHeight);
  const radius: number = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${clientX - position.left - radius}px`;
  circle.style.top = `${clientY - position.top - radius}px`;
  circle.classList.add('ripple');

  circle.style.position = 'absolute';
  circle.style.borderRadius = '50%';
  circle.style.transform = 'scale(0)';
  circle.style.background = 'rgba(255,255,255, 0.5)';
  circle.animate([{ transform: 'scale(4)', opacity: '0' }], rippleTiming);

  const ripple = button.querySelector('.ripple');

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);

  setTimeout(() => {
    circle.remove();
  }, rippleTiming);
};

const darkClasses: ClassesRecord = {
  'dark:text-light-6': true,
  'dark:bg-amber-6': true,
  'dark:hover:bg-amber-6/75': true,
  'dark:shadow-amber-6/25': true,
};

const lightClasses: ClassesRecord = {
  'text-light-6': true,
  'bg-amber-6': true,
  'hover:bg-amber-6/75': true,
  'shadow-amber-6/25': true,
};

const roundDefaultClasses: ClassesRecord = {
  'rounded-full': true,
  'p-2': true,
};

const createSizeClass = (size: ButtonSizes): ClassesRecord => {
  return { [`w-${size}`]: true, [`h-${size}`]: true };
};

const resultClasses: ComputedRef<(string | ClassesRecord)[]> = computed(() => {
  return [
    props.iconBtn ? roundDefaultClasses : '',
    props.size === 'x-small' && props.iconBtn ? createSizeClass(8) : '',
    props.size === 'small' && props.iconBtn ? createSizeClass(10) : '',
    props.size === 'default' && props.iconBtn ? createSizeClass(12) : '',
    props.size === 'large' && props.iconBtn ? createSizeClass(13) : '',
    props.size === 'x-large' && props.iconBtn ? createSizeClass(16) : '',
  ];
});
</script>

<template>
  <button
    :type="props.type"
    @click="$emit('click', $event), createRipple($event)"
    class="btn"
    :class="[darkClasses, lightClasses, resultClasses]"
  >
    <slot name="icon-left"></slot>
    <slot></slot>
    <slot name="icon-right"></slot>
  </button>
</template>

<style scoped></style>
