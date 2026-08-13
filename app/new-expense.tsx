import { useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

const categories = ['Viagens', 'Alimentação', 'Transporte', 'Software'];

export default function NewExpenseScreen() {
  const colors = useColors();
  const router = useRouter();
  const params = useLocalSearchParams<{ scan?: string }>();
  const [receiptUri, setReceiptUri] = useState<string | null>(null);
  const [merchant, setMerchant] = useState(params.scan ? 'Hotel Aurora' : '');
  const [amount, setAmount] = useState(params.scan ? '1280,40' : '');
  const [category, setCategory] = useState(params.scan ? 'Viagens' : '');
  const [submitted, setSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const pickReceipt = async (useCamera: boolean) => {
    setIsUploading(true);
    setFeedback(null);
    try {
      const result = useCamera
        ? await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 0.8 })
        : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [4, 3], quality: 0.8 });
      if (!result.canceled) {
        setReceiptUri(result.assets[0].uri);
        setMerchant('Hotel Aurora'); setAmount('1280,40'); setCategory('Viagens');
        setFeedback({ type: 'success', message: 'Recibo enviado e dados extraídos com sucesso.' });
      } else {
        setFeedback({ type: 'error', message: 'Upload cancelado. Você pode tentar novamente quando quiser.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Não foi possível processar o recibo. Verifique a permissão e tente novamente.' });
    } finally {
      setIsUploading(false);
    }
  };

  const submit = () => {
    if (!merchant || !amount || !category) { Alert.alert('Complete os campos', 'Informe fornecedor, valor e categoria para continuar.'); return; }
    setSubmitted(true);
    Alert.alert('Despesa enviada', 'A despesa foi encaminhada para aprovação em dois níveis.', [{ text: 'Ver despesas', onPress: () => router.replace('/(tabs)/expenses' as any) }]);
  };

  return <ScreenContainer edges={['top', 'left', 'right', 'bottom']} className="px-5" containerClassName="bg-background"><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
    <View style={styles.top}><Pressable onPress={() => router.back()} style={styles.back}><IconSymbol name="chevron.right" size={22} color={colors.foreground} style={{ transform: [{ rotate: '180deg' }] }} /></Pressable><Text style={[styles.title, { color: colors.foreground }]}>Nova despesa</Text><View style={{ width: 38 }} /></View>
    <Text style={[styles.intro, { color: colors.muted }]}>Registre os dados e anexe um recibo para acelerar a aprovação.</Text>
    <View style={styles.scanRow}><Pressable style={[styles.scanOption, { backgroundColor: '#EAF3F4' }]} onPress={() => pickReceipt(true)}><View style={[styles.scanIcon, { backgroundColor: colors.primary }]}><IconSymbol name="camera.fill" size={22} color="#FFF" /></View><View><Text style={[styles.scanTitle, { color: colors.foreground }]}>Fotografar recibo</Text><Text style={[styles.scanMeta, { color: colors.muted }]}>Captura pela câmera</Text></View></Pressable><Pressable style={[styles.scanOption, { backgroundColor: '#FDE9E5' }]} onPress={() => pickReceipt(false)}><View style={[styles.scanIcon, { backgroundColor: '#F26B5B' }]}><IconSymbol name="doc.text.fill" size={22} color="#FFF" /></View><View><Text style={[styles.scanTitle, { color: colors.foreground }]}>Escolher arquivo</Text><Text style={[styles.scanMeta, { color: colors.muted }]}>Da sua galeria</Text></View></Pressable></View>
    {isUploading && <View accessibilityRole="progressbar" style={[styles.uploading, { backgroundColor: '#EAF3F4' }]}><ActivityIndicator color={colors.primary} /><View style={{ flex: 1 }}><Text style={[styles.uploadingTitle, { color: colors.foreground }]}>Analisando recibo…</Text><Text style={[styles.uploadingMeta, { color: colors.muted }]}>Lendo fornecedor, valor e data</Text></View><View style={styles.loadingDots}><View style={[styles.loadingDot, { backgroundColor: colors.primary }]} /><View style={[styles.loadingDot, { backgroundColor: '#83B7B8' }]} /><View style={[styles.loadingDot, { backgroundColor: '#B9D6D4' }]} /></View></View>}
    {feedback && <View accessibilityRole="alert" style={[styles.feedback, { backgroundColor: feedback.type === 'success' ? '#E5F4EE' : '#FCE8E6' }]}><IconSymbol name={feedback.type === 'success' ? 'checkmark' : 'warning.fill'} size={18} color={feedback.type === 'success' ? colors.success : colors.error} /><Text style={[styles.feedbackText, { color: feedback.type === 'success' ? colors.success : colors.error }]}>{feedback.message}</Text><Pressable accessibilityLabel="Fechar mensagem" onPress={() => setFeedback(null)}><IconSymbol name="close" size={16} color={colors.muted} /></Pressable></View>}
    {receiptUri && <View style={[styles.receiptPreview, { borderColor: colors.border, backgroundColor: colors.surface }]}><Image source={{ uri: receiptUri }} style={styles.receiptImage} /><View style={styles.receiptInfo}><Text style={[styles.receiptTitle, { color: colors.foreground }]}>Recibo analisado</Text><Text style={[styles.receiptMeta, { color: colors.success }]}>Dados extraídos com confiança alta</Text></View><IconSymbol name="checkmark" size={20} color={colors.success} /></View>}
    <Text style={[styles.sectionLabel, { color: colors.foreground }]}>Detalhes</Text>
    <Text style={[styles.label, { color: colors.muted }]}>Fornecedor</Text><TextInput value={merchant} onChangeText={setMerchant} placeholder="Ex.: Hotel Aurora" placeholderTextColor={colors.muted} style={[styles.input, { color: colors.foreground, backgroundColor: colors.surface, borderColor: colors.border }]} />
    <View style={styles.twoCol}><View style={{ flex: 1 }}><Text style={[styles.label, { color: colors.muted }]}>Valor total</Text><TextInput value={amount} onChangeText={setAmount} keyboardType="decimal-pad" placeholder="R$ 0,00" placeholderTextColor={colors.muted} style={[styles.input, { color: colors.foreground, backgroundColor: colors.surface, borderColor: colors.border }]} /></View><View style={{ flex: 1 }}><Text style={[styles.label, { color: colors.muted }]}>Data</Text><View style={[styles.input, { justifyContent: 'center', backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={{ color: colors.foreground }}>13 ago 2026</Text></View></View></View>
    <Text style={[styles.label, { color: colors.muted }]}>Categoria</Text><View style={styles.chips}>{categories.map((item) => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, { borderColor: category === item ? colors.primary : colors.border, backgroundColor: category === item ? '#EAF3F4' : colors.surface }]}><Text style={{ color: category === item ? colors.primary : colors.muted, fontSize: 12, fontWeight: '700' }}>{item}</Text></Pressable>)}</View>
    <Text style={[styles.label, { color: colors.muted }]}>Centro de custo</Text><View style={[styles.select, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={{ color: colors.foreground }}>Vendas</Text><IconSymbol name="chevron.right" size={18} color={colors.muted} /></View>
    <View style={[styles.policy, { backgroundColor: '#E5F4EE' }]}><View style={styles.policyIcon}><IconSymbol name="checkmark.seal.fill" size={20} color={colors.success} /></View><View style={{ flex: 1 }}><Text style={[styles.policyTitle, { color: colors.foreground }]}>Verificação de política</Text><Text style={[styles.policyText, { color: colors.muted }]}>Dentro do limite de viagens e com recibo anexado.</Text></View><Text style={{ color: colors.success, fontSize: 11, fontWeight: '800' }}>CONFORME</Text></View>
    <Pressable disabled={submitted} onPress={submit} style={({ pressed }) => [styles.submit, { backgroundColor: submitted ? colors.muted : '#F26B5B', opacity: pressed ? 0.85 : 1 }]}><Text style={styles.submitText}>{submitted ? 'Enviada' : 'Enviar para aprovação'}</Text><IconSymbol name="arrow.up.right" size={19} color="#FFF" /></Pressable>
  </ScrollView></ScreenContainer>;
}

const styles = StyleSheet.create({ content: { paddingTop: 14, paddingBottom: 30 }, uploading: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 15, padding: 13, marginBottom: 12 }, uploadingTitle: { fontSize: 12, fontWeight: '800' }, uploadingMeta: { fontSize: 10, marginTop: 3 }, loadingDots: { flexDirection: 'row', gap: 4 }, loadingDot: { width: 6, height: 6, borderRadius: 3 }, feedback: { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 13, padding: 11, marginBottom: 12 }, feedbackText: { flex: 1, fontSize: 11, lineHeight: 15, fontWeight: '700' }, top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }, back: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EAF3F4' }, title: { fontSize: 20, fontWeight: '800' }, intro: { fontSize: 13, lineHeight: 19, marginBottom: 18 }, scanRow: { gap: 10, marginBottom: 20 }, scanOption: { flexDirection: 'row', alignItems: 'center', padding: 13, borderRadius: 16 }, scanIcon: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginRight: 11 }, scanTitle: { fontSize: 13, fontWeight: '800' }, scanMeta: { fontSize: 11, marginTop: 3 }, receiptPreview: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 16, padding: 10, marginBottom: 18 }, receiptImage: { width: 54, height: 54, borderRadius: 10, marginRight: 11 }, receiptInfo: { flex: 1 }, receiptTitle: { fontSize: 12, fontWeight: '800' }, receiptMeta: { fontSize: 11, marginTop: 3 }, sectionLabel: { fontSize: 16, fontWeight: '800', marginBottom: 13 }, label: { fontSize: 11, fontWeight: '700', marginBottom: 6, marginTop: 11 }, input: { minHeight: 47, borderWidth: 1, borderRadius: 13, paddingHorizontal: 13, fontSize: 14 }, twoCol: { flexDirection: 'row', gap: 10 }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, chip: { paddingHorizontal: 12, paddingVertical: 9, borderRadius: 10, borderWidth: 1 }, select: { minHeight: 47, borderWidth: 1, borderRadius: 13, paddingHorizontal: 13, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, policy: { flexDirection: 'row', alignItems: 'center', padding: 13, borderRadius: 15, marginTop: 22, gap: 9 }, policyIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#CDEBDD', alignItems: 'center', justifyContent: 'center' }, policyTitle: { fontSize: 12, fontWeight: '800' }, policyText: { fontSize: 10, marginTop: 3, lineHeight: 14 }, submit: { minHeight: 52, borderRadius: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, marginTop: 17 }, submitText: { color: '#FFF', fontWeight: '800', fontSize: 14 } });
