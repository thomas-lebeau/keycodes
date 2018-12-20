import './style';
import App from './components/app';

import { version } from '../package.json';

if (typeof window !== 'undefined') {
  window.__version = version;
}

export default App;
