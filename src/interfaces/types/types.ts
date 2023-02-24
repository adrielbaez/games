export enum DIRECTION {
  Right,
  Up,
  Left,
  Down,
}

export interface IGestureEventType {
  nativeEvent: {
    translationX: number;
    translationY: number;
  };
}

export interface Coordinates {
  x: number;
  y: number;
}
