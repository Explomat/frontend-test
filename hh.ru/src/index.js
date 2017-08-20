import { render } from './views/render';
import Calendar from './views/calendar';
//import Test from './views/Test';

import 'babel-polyfill';
import '../style/common.styl';

render(Calendar(), document.getElementById('app'));