import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import PixelIcon from '../components/PixelIcon';
import { PetProvider } from '../context/PetContext';
import AboutScreen from '../screens/AboutScreen';
import AccelerometerScreen from '../screens/AccelerometerScreen';
import BounceScreen from '../screens/BounceScreen';
import CarouselScreen from '../screens/CarouselScreen';
import DragRotationScreen from '../screens/DragRotationScreen';
import HomeScreen from '../screens/HomeScreen';
import LoadingScreen from '../screens/LoadingScreen';
import MultitouchScreen from '../screens/MultitouchScreen';
import { COLORS } from '../theme';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <View style={styles.logoMark}><Text style={styles.logoMarkText}>T</Text></View>
        <Text style={styles.drawerTitle}>TAMACHIMBO</Text>
        <Text style={styles.drawerSubtitle}>El propio Juanito Alimaña Produciendo</Text>
      </View>
      <Text style={styles.menuCaption}>MENÚ PRINCIPAL</Text>
      <DrawerItemList {...props} />
      <View style={styles.drawerFooter}>
        <View style={styles.footerLine} />
        <Text style={styles.footerText}>EL 1.0 PQ NO HAY MAS</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const iconFor = {
  Inicio: 'home',
  'Drag & Drop': 'drag',
  'Loading Animation': 'loading',
  'Multitouch Gestures': 'multitouch',
  'Bounce Animation': 'bounce',
  'Animated Carousel': 'carousel',
  Accelerometer: 'sensor',
  'Acerca de': 'info',
};

export function TamachimboNavigator({ initialRouteName = 'Inicio' }) {
  return (
    <PetProvider>
      <Drawer.Navigator
        initialRouteName={initialRouteName}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ route }) => ({
          headerShown: false,
          drawerType: 'front',
          swipeEnabled: true,
          overlayColor: 'rgba(0,0,0,0.72)',
          drawerStyle: { backgroundColor: COLORS.surface, width: 292, borderRightWidth: 1, borderRightColor: COLORS.redDark },
          drawerActiveTintColor: COLORS.white,
          drawerInactiveTintColor: '#929292',
          drawerActiveBackgroundColor: '#3A1013',
          drawerLabelStyle: { fontSize: 11, fontWeight: '800', letterSpacing: 0.4, marginLeft: -10 },
          drawerItemStyle: { borderRadius: 8, marginHorizontal: 10, marginVertical: 2 },
          drawerIcon: ({ focused }) => <PixelIcon name={iconFor[route.name] || 'info'} size={18} color={focused ? COLORS.red : '#8A8A8A'} />,
        })}
      >
        <Drawer.Screen name="Inicio" component={HomeScreen} />
        <Drawer.Screen name="Drag & Drop" component={DragRotationScreen} />
        <Drawer.Screen name="Loading Animation" component={LoadingScreen} />
        <Drawer.Screen name="Multitouch Gestures" component={MultitouchScreen} />
        <Drawer.Screen name="Bounce Animation" component={BounceScreen} />
        <Drawer.Screen name="Animated Carousel" component={CarouselScreen} />
        <Drawer.Screen name="Accelerometer" component={AccelerometerScreen} />
        <Drawer.Screen name="Acerca de" component={AboutScreen} />
      </Drawer.Navigator>
    </PetProvider>
  );
}

const styles = StyleSheet.create({
  drawerContent: { flexGrow: 1, paddingTop: 0 },
  drawerHeader: { minHeight: 150, paddingHorizontal: 22, paddingTop: 26, paddingBottom: 20, backgroundColor: '#10090A', borderBottomWidth: 1, borderBottomColor: '#3D1114', justifyContent: 'center' },
  logoMark: { width: 38, height: 38, backgroundColor: COLORS.red, alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginBottom: 12 },
  logoMarkText: { color: COLORS.white, fontSize: 24, fontWeight: '900' },
  drawerTitle: { color: COLORS.white, fontSize: 18, letterSpacing: 2.2, fontWeight: '900' },
  drawerSubtitle: { color: COLORS.red, fontSize: 8, fontWeight: '900', letterSpacing: 1.1, marginTop: 5 },
  menuCaption: { color: '#666666', fontSize: 8, fontWeight: '900', letterSpacing: 1.5, marginTop: 21, marginBottom: 9, marginLeft: 22 },
  drawerFooter: { marginTop: 'auto', paddingHorizontal: 22, paddingBottom: 22 },
  footerLine: { height: 1, backgroundColor: '#333333', marginBottom: 12 },
  footerText: { color: '#666666', fontSize: 8, fontWeight: '800', letterSpacing: 1 },
});
