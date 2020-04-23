import { FC } from 'react';
import { BeagleConfig as BeagleCoreConfig, BeagleUIService as BeagleCoreUIService, DefaultSchema, LoadParams, IdentifiableBeagleUIElement, BeagleView } from '@zup-it/beagle-web';
import { UpdateWithTreeParams } from '@zup-it/beagle-web/dist/types';
import { ActionHandler } from './actions/types';
export interface BeagleConfig<Schema = DefaultSchema> extends BeagleCoreConfig<Schema> {
    components: {
        error: FC;
        loading: FC;
    } & {
        [K in keyof Schema]: FC<Schema[K]>;
    };
    customActions?: Record<string, ActionHandler>;
}
export interface BeagleUIService<Schema = DefaultSchema> extends BeagleCoreUIService<Schema> {
    getConfig: () => BeagleConfig<Schema>;
}
export interface BeagleContext<T = any> {
    replace: (params: LoadParams<T>) => Promise<void>;
    append: (params: LoadParams<T>) => Promise<void>;
    prepend: (params: LoadParams<T>) => Promise<void>;
    updateWithTree: (params: Omit<UpdateWithTreeParams<T>, 'elementId'>) => void;
    getElementId: () => string;
    getElement: () => IdentifiableBeagleUIElement<T> | null;
    getView: () => BeagleView<T>;
}
export interface BeagleComponent<T = any> {
    beagleContext: BeagleContext<T>;
}
export interface DataContext {
    id: string;
    value?: any;
}
