export type TButtonSizes = 8 | 10 | 12 | 13 | 16;

export type TButtonNames = 'x-small' | 'small' | 'default' | 'large' | 'x-large';

export type TButtonProps = {
  iconBtn?: boolean;
  size?: TButtonNames;
  type?: 'button' | 'submit' | 'reset';
};
