import { clone } from '@zup-it/beagle-web/dist/utils/tree-manipulation';
import { replaceBindings } from '../bindings';
import setAttribute from './setAttribute';
import addChildren from './addChildren';
import setContext from './setContext';
import sendRequest from './sendRequest';
const defaultHandlers = {
    setAttribute,
    addChildren,
    setContext,
    sendRequest,
};
function createEventHandler(customActionHandlers = {}, beagleView) {
    Object.keys(customActionHandlers).forEach((actionType) => {
        if (defaultHandlers[actionType])
            console.warn(`A default handler with type ${actionType} exists. Are you sure you want to replace it?`);
    });
    const actionHandlers = { ...defaultHandlers, ...customActionHandlers };
    const handleAction = (params) => {
        const actionType = params.action._actionType_;
        if (!actionHandlers[actionType]) {
            console.warn(`There is no action handler for action with type "${actionType}"`);
            return;
        }
        if (params.action.debug)
            console.log('Dispatched:', params);
        const actionWithEventValues = replaceBindings(params.action, params.eventContextHierarchy);
        if (params.action.debug)
            console.log('Action after replacing bindings:', actionWithEventValues);
        actionHandlers[actionType]({ ...params, action: actionWithEventValues });
    };
    function isBeagleAction(element) {
        return element && !!element._actionType_;
    }
    function transformBeagleActionsToFunction(element, eventName, actions, contextHierarchy) {
        return (event) => {
            actions.forEach(action => handleAction({
                action,
                eventContextHierarchy: [{ id: eventName, value: event }, ...contextHierarchy],
                element,
                handleAction,
                beagleView,
            }));
        };
    }
    function replaceBeagleActionsWithFunctions(element, tree, contextHierarchy = []) {
        const keys = Object.keys(element);
        const ignore = ['id', '_beagleType_', '_context_', 'children'];
        const hierarchy = element._context_
            ? [element._context_, ...contextHierarchy]
            : contextHierarchy;
        keys.forEach((key) => {
            if (ignore.includes(key))
                return;
            const value = element[key];
            const isAction = isBeagleAction(value);
            const isActionArray = value instanceof Array && isBeagleAction(value[0]);
            if (!isAction && !isActionArray)
                return;
            const actions = isAction ? [value] : value;
            element[key] = transformBeagleActionsToFunction(element, key, actions, hierarchy);
        });
        if (element.children)
            element.children.forEach(child => replaceBeagleActionsWithFunctions(child, tree, hierarchy));
    }
    function interpretEventsInTree(tree) {
        const treeWithFunctions = clone(tree);
        replaceBeagleActionsWithFunctions(treeWithFunctions, treeWithFunctions);
        return treeWithFunctions;
    }
    return {
        interpretEventsInTree,
    };
}
export default createEventHandler;
//# sourceMappingURL=index.js.map