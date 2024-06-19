
import type { JSX as VueJsx } from 'vue/jsx-runtime';

/** Vue JSX 声明  */
declare global {

  namespace JSX {

    interface Element extends VueJsx.Element {

    }

    interface ElementClass extends VueJsx.ElementClass {

    }

    interface ElementAttributesProperty extends VueJsx.ElementAttributesProperty {

    }

    interface IntrinsicElements extends VueJsx.IntrinsicElements {

    }

    interface IntrinsicAttributes extends VueJsx.IntrinsicAttributes {}

    }
}
