import { FC } from 'react';
import { LoadParams } from '@zup-it/beagle-web';
interface BeagleRemoteViewType extends LoadParams {
    id?: string;
}
declare const BeagleRemoteView: FC<BeagleRemoteViewType>;
export default BeagleRemoteView;
