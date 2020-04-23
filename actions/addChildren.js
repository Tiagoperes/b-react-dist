import { findById } from '@zup-it/beagle-web/dist/utils/tree-reading';
const addChildren = ({ action, beagleView }) => {
    const { componentId, value, mode = 'append' } = action;
    const uiTree = beagleView.getTree();
    const component = findById(uiTree, componentId);
    if (!component) {
        console.warn(`No component with id ${componentId} has been found in the tree`);
        return;
    }
    const currentChildren = component.children || [];
    if (mode === 'append')
        component.children = [...currentChildren, ...value];
    if (mode === 'prepend')
        component.children = [...value, ...currentChildren];
    if (mode === 'replace')
        component.children = value;
    beagleView.updateWithTree({ sourceTree: uiTree });
};
export default addChildren;
//# sourceMappingURL=addChildren.js.map