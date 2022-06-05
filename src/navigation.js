import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Login from './screens/Login';
import Discussions, {screenOption as DiscussionsOptions} from './screens/Discussions';
import DiscussionDetails, {screenOption as DiscussionDetailsOption} from './screens/DiscussionDetails';
import AddNew ,{screenOption as AddNewOption} from './screens/AddNew';

export const ChatStack = ()=> {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Discussions" component={Discussions} options={DiscussionsOptions} />
      <Stack.Screen name="DiscussionDetails" component={DiscussionDetails} options={DiscussionDetailsOption} />
      <Stack.Screen name="AddNew" component={AddNew} options={AddNewOption} />
    </Stack.Navigator>
  );
}
