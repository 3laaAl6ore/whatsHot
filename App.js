import { NavigationContainer } from '@react-navigation/native';
import {ChatStack} from "./src/navigation.js";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import allData from './store/GetAllDataReduser';

const rootReducer = combineReducers({
  allData : allData,
});
const store = createStore(rootReducer , applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store = {store}>

    <NavigationContainer>
      <ChatStack />
    </NavigationContainer>
    </Provider>
  );
}
