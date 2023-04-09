/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './Screens/App';

import {name as appName} from './app.json';
import BaseApp from './BaseApp';

AppRegistry.registerComponent(appName, () => BaseApp);
// AppRegistry.registerComponent(appName, () => App);
