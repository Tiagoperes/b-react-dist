import { Fragment, createElement } from 'react';
import { map } from 'lodash';
import { BeagleContext } from '@zup-it/beagle-web';
const createReactComponentTree = (components, ui, viewId) => {
    const { _beagleType_, children, id, _context_, ...props } = ui;
    const Component = components[_beagleType_];
    if (!Component) {
        console.error(`Error: Beagle could not find component ${_beagleType_}. This component and its children won't be rendered.`);
        return createElement(Fragment);
    }
    const beagleContext = BeagleContext.getContext(viewId, id);
    const componentChildren = map(children, child => createReactComponentTree(components, child, viewId));
    const componentProps = { ...props, key: id, beagleContext };
    return createElement(Component, componentProps, componentChildren);
};
export default createReactComponentTree;
//# sourceMappingURL=renderer.js.map