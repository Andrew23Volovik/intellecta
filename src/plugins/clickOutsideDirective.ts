import type { Directive, DirectiveBinding } from 'vue';
interface HTMLClickOutsideEvent extends HTMLElement {
  clickOutsideEvent(event: MouseEvent): void;
}

export default {
  beforeMount(el: HTMLClickOutsideEvent, binding: DirectiveBinding): void {
    el.clickOutsideEvent = function (event: MouseEvent): void {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: HTMLClickOutsideEvent): void {
    document.removeEventListener('click', el.clickOutsideEvent);
  },
} satisfies Directive;
