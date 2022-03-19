import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Home from './screens/Home'
import TelaTipo from './screens/Tipo/screen-tipo'
import TelaAtividade from './screens/Atividade/screen-atividade'

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    TelaTipo,
    TelaAtividade
  })
);

export default function App(){
  return(
    <Routes/>
  )
}