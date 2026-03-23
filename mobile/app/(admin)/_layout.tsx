import { Stack } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function Layout() {
  const { signOut } = useAuth();
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: '#F44336' },
      headerTintColor: '#fff',
      headerRight: () => (
        <TouchableOpacity onPress={signOut} style={{ marginRight: 15 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
      )
    }}>
      <Stack.Screen name="dashboard" options={{ title: 'Admin Dashboard' }} />
    </Stack>
  );
}
