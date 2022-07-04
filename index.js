
import {AppRegistry,I18nManager} from 'react-native';
import { LogBox } from 'react-native';
import App from './src/app';
if (!__DEV__) {
  global.console.log = () => {}
  global.console.warn = () => {}
  global.console.error = () => {}
}

  I18nManager.allowRTL(true) ;
  LogBox.ignoreLogs(['Remote debugger']);
AppRegistry.registerComponent("footbal", () => App);
