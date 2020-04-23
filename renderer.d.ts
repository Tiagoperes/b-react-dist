import { FC } from 'react';
import { BeagleUIElement } from '@zup-it/beagle-web';
declare const createReactComponentTree: <Schema>(components: {
    error: FC<{}>;
    loading: FC<{}>;
} & { [K in keyof Schema]: FC<Schema[K]>; }, ui: BeagleUIElement<Schema>, viewId: string) => JSX.Element;
export default createReactComponentTree;
