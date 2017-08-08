import 'babel-polyfill';
import '../style/common.styl';

import Calendar from './views/calendar';

const domNode = document.getElementById('app');
domNode.innerHTML = new Calendar();