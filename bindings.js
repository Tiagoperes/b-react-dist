import get from 'lodash/get';
const bindingRegex = /\$\{([^\}]+)\}/g;
const fullBindingRegex = /^\$\{([^\}]+)\}$/;
function getBindingValue(path, contextHierarchy) {
    const pathMatch = path.match(/^([^\.]+)\.?(.*)/);
    if (!pathMatch || pathMatch.length < 1)
        return;
    const contextId = pathMatch[1];
    const contextPath = pathMatch[2];
    const context = contextHierarchy.find(({ id }) => id === contextId);
    if (!context)
        return;
    return contextPath ? get(context.value, contextPath) : context.value;
}
function replaceBindingsInString(str, contextHierarchy) {
    const fullMatch = str.match(fullBindingRegex);
    if (fullMatch) {
        const bindingValue = getBindingValue(fullMatch[1], contextHierarchy);
        return bindingValue === undefined ? str : bindingValue;
    }
    return str.replace(bindingRegex, (bindingStr, path) => {
        const bindingValue = getBindingValue(path, contextHierarchy);
        const asString = typeof bindingValue === 'object' ? JSON.stringify(bindingValue) : bindingValue;
        return bindingValue === undefined ? bindingStr : asString;
    });
}
export function replaceBindings(data, contextHierarchy = []) {
    if (typeof data === 'string')
        return replaceBindingsInString(data, contextHierarchy);
    if (data instanceof Array)
        return data.map(item => replaceBindings(item, contextHierarchy));
    if (typeof data === 'object') {
        const hierarchy = data._context_ ? [data._context_, ...contextHierarchy] : contextHierarchy;
        const ignore = ['id', '_beagleType_', '_context_'];
        return Object.keys(data).reduce((result, key) => ({
            ...result,
            [key]: ignore.includes(key) ? data[key] : replaceBindings(data[key], hierarchy),
        }), {});
    }
    return data;
}
//# sourceMappingURL=bindings.js.map