/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  Appearance,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

// Same palette as NewAppScreen, which doesn't export its theme.
const COLORS = {
  light: { background: '#f3f3f3', text: '#000' },
  dark: { background: '#000', text: '#fff' },
};

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.toggleRow,
          {
            backgroundColor: colors.background,
            paddingTop: safeAreaInsets.top,
            paddingLeft: safeAreaInsets.left + 24,
            paddingRight: safeAreaInsets.right + 24,
          },
        ]}
      >
        <Text style={[styles.toggleLabel, { color: colors.text }]}>
          Dark mode
        </Text>
        <Switch
          accessibilityLabel="Dark mode"
          value={isDarkMode}
          onValueChange={on => Appearance.setColorScheme(on ? 'dark' : 'light')}
        />
      </View>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={{ ...safeAreaInsets, top: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  toggleLabel: {
    fontSize: 16,
  },
});

export default App;
