import { DefaultSchema } from '@zup-it/beagle-web';
import { ActionHandler, CustomAction } from './actions/types';
import BeagleRemoteView from './component';
import { BeagleProvider } from './provider';
import { BeagleConfig, BeagleUIService, BeagleComponent } from './types';
declare function createBeagleUIService<Schema = DefaultSchema>(config: BeagleConfig<Schema>): import("@zup-it/beagle-web").BeagleUIService<Schema, import("@zup-it/beagle-web").BeagleConfig<Schema>>;
export { createBeagleUIService, BeagleRemoteView, BeagleProvider, BeagleConfig, BeagleUIService, BeagleComponent, ActionHandler, CustomAction, };
