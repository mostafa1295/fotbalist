
import * as React from 'react';
import { NavigationContainer,} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './component/splash'
import Drawerlay from './component/drawerlayout'
import Userpage from './component/userpage';
import Sendsms from './component/sendsms';
import Setting from './component/drawer/setting';
import Laws from './component/drawer/laws';
import LawsStop from './component/lawsStop';




// pk.eyJ1IjoibW9zdGFmYTczMTIiLCJhIjoiY2t3NHh4NGc2MTQwdTJ3cDZveDJ3ejV0biJ9.dIqshLCwWVixKrZYzhwcVA



 const App =()=> {

const Stack = createNativeStackNavigator();

      return (
         
    
      <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen  name="splash" component={Splash} options={{headerShown:false}} />
    <Stack.Screen  name="Home" component={Drawerlay} options={{headerShown:false}} />
    <Stack.Screen  name="userpage" component={Userpage} options={{headerShown:false}}/>
     <Stack.Screen  name="sendsms" component={Sendsms} options={{headerShown:false}}/>
   <Stack.Screen  name="setting" component={Setting} options={{headerShown:false}}/>
   <Stack.Screen  name="lawsStop" component={LawsStop} options={{headerShown:false}}/>

    </Stack.Navigator>
     </NavigationContainer>
    
  );

}
export default App
