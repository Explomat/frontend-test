import { render } from './lib/render';
import Calendar from './views/containers/calendar';
//import Test from './views/Test';

import 'babel-polyfill';
import '../style/common.styl';

render(Calendar(), document.getElementById('app'));