import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
export type IconSymbolName = string;

const MAPPING: Record<string, MaterialIconName> = {
  'house.fill': 'home', 'doc.text.fill': 'receipt-long', 'checkmark.seal.fill': 'verified', 'chart.bar.fill': 'bar-chart',
  plus: 'add', 'camera.fill': 'photo-camera', 'arrow.up.right': 'north-east', 'arrow.down.left': 'south-west',
  'warning.fill': 'warning', 'chevron.right': 'chevron-right', filter: 'tune', search: 'search', more: 'more-horiz',
  'cloud.fill': 'cloud-done', sync: 'sync', close: 'close', checkmark: 'check', xmark: 'close', 'paperplane.fill': 'send',
  'person.fill': 'person', 'gearshape.fill': 'settings',
};

export function IconSymbol({ name, size = 24, color, style, weight }: { name: IconSymbolName; size?: number; color: string | OpaqueColorValue; style?: StyleProp<TextStyle>; weight?: string }) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name] ?? 'help-outline'} style={style} />;
}
