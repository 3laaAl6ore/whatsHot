import { NavigationContainer } from '@react-navigation/native';
import {ChatStack} from "./src/navigation.js";
export default function App() {
  return (
    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
  );
}
