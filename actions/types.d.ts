import { IdentifiableBeagleUIElement, BeagleView } from '@zup-it/beagle-web';
import { DataContext } from '../types';
declare type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
export interface SendRequestAction {
    _actionType_: 'sendRequest';
    url: string;
    method?: HTTPMethod;
    data?: any;
    headers?: Record<string, string>;
    onSuccess?: BeagleAction;
    onError?: BeagleAction;
    onFinish?: BeagleAction;
}
export interface SetAttributeAction {
    _actionType_: 'setAttribute';
    componentId: string;
    attributeName: string;
    attributeValue: string;
}
export interface AddChildrenAction {
    _actionType_: 'addChildren';
    componentId: string;
    value: IdentifiableBeagleUIElement[];
    mode?: 'append' | 'prepend' | 'replace';
}
export interface SetContextAction {
    _actionType_: 'setContext';
    context?: string;
    path?: string;
    value: string;
}
export interface CustomAction {
    _actionType_: string;
    [key: string]: any;
}
export declare type BeagleAction = (SendRequestAction | SetAttributeAction | AddChildrenAction | SetContextAction | CustomAction);
export interface ActionHandlerParams<Action extends BeagleAction = any> {
    action: Action;
    eventContextHierarchy: DataContext[];
    element: IdentifiableBeagleUIElement;
    beagleView: BeagleView;
    handleAction: ActionHandler<BeagleAction>;
}
export declare type ActionHandler<Action extends BeagleAction = any> = ((params: ActionHandlerParams<Action>) => void);
export {};
