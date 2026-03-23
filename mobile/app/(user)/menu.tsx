import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, BackHandler, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function UserMenu() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleExit = () => {
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      console.log('User tapped exit, not supported on this platform');
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out the daily chicken prices on the Price App! 🍗 Get the latest rates for Broiler, Skin, and Skinless chicken anytime.\n\n Still working on it Thankyou for your patience.',
        title: 'Share Price App',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Red Header Bar */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Market Price</Text>
        </View>

        {/* Green Update Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.statusText} numberOfLines={1} ellipsizeMode="clip">
            UPDATED WHEN RATES WILL CHANGED  DAILY
          </Text>
        </View>

        {/* Scrollable Menu Items */}
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <MenuButton
            title="TODAY'S BROILER CHICKEN PRICES"
            onPress={() => router.push('/(user)/prices')}
          />
          <MenuButton
            title="CHECK RECENT PRICES"
            onPress={() => router.push('/(user)/recent' as any)}
          />
          <MenuButton
            title="USER GUIDE"
            onPress={() => router.push('/(user)/guide')}
          />
          <MenuButton
            title="FEEDBACK"
            onPress={() => router.push('/(user)/feedback')}
          />
          <MenuButton
            title="SHARE OUR APP"
            onPress={handleShare}
          />
          <MenuButton
            title="LOGOUT"
            onPress={signOut}
          />
          <MenuButton
            title="EXIT"
            onPress={handleExit}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function MenuButton({ title, onPress }: { title: string, onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F44336', // matches header background
  },
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', // Off-white backing
  },
  header: {
    backgroundColor: '#F44336', // Red color
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 4,
  },
  statusBar: {
    backgroundColor: '#00E676', // Bright Green color
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  statusText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  scrollContainer: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#F44336',
    width: '95%',
    paddingVertical: 18,
    borderRadius: 30, // fully rounded sides
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 3.5px rgba(0, 0, 0, 0.15)',
    elevation: 4, // For Android
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  }
});
