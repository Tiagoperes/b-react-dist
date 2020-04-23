import React, { useState, useContext, useEffect, useMemo, } from 'react';
import { BeagleContext, } from '@zup-it/beagle-web';
import { uniqueId } from 'lodash';
import createEventHandler from './actions';
import { replaceBindings } from './bindings';
import BeagleProvider from './provider';
import createReactComponentTree from './renderer';
const BeagleRemoteView = (loadParams) => {
    const beagleService = useContext(BeagleProvider);
    const [uiTree, setUiTree] = useState();
    const [viewID, setViewID] = useState(loadParams.id);
    let eventHandler = null;
    if (!beagleService)
        throw Error('Couldn\'t find a BeagleProvider in the component tree!');
    const updateTree = (beagleUITree) => {
        if (!eventHandler)
            throw new Error('Couldn\'t find an Event Handler! This is probably a bug within the Beagle library, please report');
        const uiTreeWithActions = eventHandler.interpretEventsInTree(beagleUITree);
        const uiTreeWithValues = replaceBindings(uiTreeWithActions);
        setUiTree(uiTreeWithValues);
    };
    const handleError = (errorListener) => {
        errorListener.forEach(error => console.error(error));
    };
    const beagleView = useMemo(() => {
        if (!loadParams.id)
            setViewID(uniqueId());
        const view = beagleService.createView();
        view.subscribe(updateTree);
        view.addErrorListener(handleError);
        return view;
    }, []);
    eventHandler = useMemo(() => createEventHandler(beagleService.getConfig().customActions, beagleView), [beagleView]);
    useEffect(() => {
        beagleView.updateWithFetch(loadParams);
    }, [loadParams]);
    useEffect(() => {
        BeagleContext.registerView(`${viewID}`, beagleView);
        return () => BeagleContext.unregisterView(`${viewID}`);
    }, []);
    const renderComponents = () => {
        const components = beagleService.getConfig().components;
        return uiTree && viewID
            ? createReactComponentTree(components, uiTree, viewID)
            : React.createElement(React.Fragment, null);
    };
    return renderComponents();
};
export default BeagleRemoteView;
//# sourceMappingURL=component.js.map