import { IdentifiableBeagleUIElement, BeagleView } from '@zup-it/beagle-web';
import { ActionHandler } from './types';
declare function createEventHandler(customActionHandlers: Record<string, ActionHandler<any>> | undefined, beagleView: BeagleView): {
    interpretEventsInTree: (tree: IdentifiableBeagleUIElement<Record<string, Record<string, any>>>) => IdentifiableBeagleUIElement<Record<string, Record<string, any>>>;
};
export declare type EventHandler = ReturnType<typeof createEventHandler>;
export default createEventHandler;
