export type ButtonSizes = 8 | 10 | 12 | 13 | 16;

export type ButtonNames = 'x-small' | 'small' | 'default' | 'large' | 'x-large';

export type ButtonProps = {
  iconBtn?: boolean;
  size?: ButtonNames;
  type?: 'button' | 'submit' | 'reset';
};
