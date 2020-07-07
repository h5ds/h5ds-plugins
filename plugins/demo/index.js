import { Editor, icon } from './Editor';
import { LayerComp, config, scripts } from './Layer';
import LayerJSON from './LayerJSON';
import { mountPlugin } from 'h5ds-mount-plugin';

mountPlugin({ Editor, LayerJSON, LayerComp, scripts, config, icon });

export { Editor, LayerJSON, LayerComp, scripts, config, icon };
