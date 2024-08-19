
import { CSSTransition } from 'react-transition-group';
import styles from './transition.module.scss';

export interface CSSTransitionClassNames {
  appear?: string | undefined;
  appearActive?: string | undefined;
  appearDone?: string | undefined;
  enter?: string | undefined;
  enterActive?: string | undefined;
  enterDone?: string | undefined;
  exit?: string | undefined;
  exitActive?: string | undefined;
  exitDone?: string | undefined;
}

export const TRANSITION_FADE_IN: CSSTransitionClassNames = {

};
