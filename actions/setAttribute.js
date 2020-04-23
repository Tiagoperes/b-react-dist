import { findById } from '@zup-it/beagle-web/dist/utils/tree-reading';
const setAttribute = ({ action, beagleView }) => {
    const { attributeName, attributeValue, componentId } = action;
    const uiTree = beagleView.getTree();
    const component = findById(uiTree, componentId);
    if (!component) {
        console.warn(`No component with id ${componentId} has been found in the tree`);
        return;
    }
    component[attributeName] = attributeValue;
    beagleView.updateWithTree({ sourceTree: uiTree });
};
export default setAttribute;
//# sourceMappingURL=setAttribute.js.map