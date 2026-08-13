import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === 'web' ? 10 : Math.max(insets.bottom, 8);
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.muted,
      tabBarButton: HapticTab,
      tabBarStyle: { height: 62 + bottomPadding, paddingTop: 8, paddingBottom: bottomPadding, backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1 },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Visão geral', tabBarIcon: ({ color }) => <IconSymbol name="house.fill" size={22} color={color} /> }} />
      <Tabs.Screen name="expenses" options={{ title: 'Despesas', tabBarIcon: ({ color }) => <IconSymbol name="doc.text.fill" size={22} color={color} /> }} />
      <Tabs.Screen name="approvals" options={{ title: 'Aprovações', tabBarIcon: ({ color }) => <IconSymbol name="checkmark.seal.fill" size={22} color={color} /> }} />
      <Tabs.Screen name="insights" options={{ title: 'Análises', tabBarIcon: ({ color }) => <IconSymbol name="chart.bar.fill" size={22} color={color} /> }} />
    </Tabs>
  );
}
