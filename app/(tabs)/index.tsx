import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { budgetData, formatCurrency, initialExpenses, policyTone, statusTone } from '@/lib/expense-data';
import { useColors } from '@/hooks/use-colors';

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const [synced, setSynced] = useState(false);
  const pending = initialExpenses.filter((item) => item.status === 'Em aprovação').length;
  const review = initialExpenses.filter((item) => item.status === 'Revisar').length;
  

  const startExpense = () => router.push('/new-expense');
  const syncNow = () => {
    setSynced(true);
    Alert.alert('Sincronização concluída', '2 despesas foram enviadas para o sistema contábil demonstrativo.');
  };

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.eyebrow, { color: colors.primary }]}>QUARTA-FEIRA, 13 AGO</Text>
            <Text style={[styles.title, { color: colors.foreground }]}>Olá, Camila</Text>
            <Text style={[styles.subtitle, { color: colors.muted }]}>Aqui está o pulso das suas despesas.</Text>
          </View>
          <Pressable style={[styles.avatar, { backgroundColor: '#D9EEEC' }]} onPress={() => router.push('/profile' as any)}><Text style={[styles.avatarText, { color: colors.primary }]}>CM</Text></Pressable>
        </View>

        <View style={[styles.heroCard, { backgroundColor: colors.primary }]}>
          <View style={styles.heroTop}><View><Text style={styles.heroLabel}>Gasto aprovado em agosto</Text><Text style={styles.heroValue}>{formatCurrency(12890.40)}</Text></View><View style={styles.heroIcon}><IconSymbol name="chart.bar.fill" size={22} color="#FFFFFF" /></View></View>
          <View style={styles.heroBottom}><View><Text style={styles.heroMeta}>Limite mensal</Text><Text style={styles.heroMetaValue}>{formatCurrency(24000)}</Text></View><View style={styles.heroProgress}><View style={styles.heroProgressFill} /></View><Text style={styles.heroPercent}>54%</Text></View>
        </View>

        <View style={styles.metricsRow}>
          <Pressable style={[styles.metricCard, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/approvals' as any)}><View style={[styles.metricIcon, { backgroundColor: '#FFF3DA' }]}><IconSymbol name="warning.fill" size={18} color="#C88719" /></View><Text style={[styles.metricValue, { color: colors.foreground }]}>{pending}</Text><Text style={[styles.metricLabel, { color: colors.muted }]}>Aguardando você</Text></Pressable>
          <Pressable style={[styles.metricCard, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push('/expenses')}><View style={[styles.metricIcon, { backgroundColor: '#FCE8E6' }]}><IconSymbol name="doc.text.fill" size={18} color="#C6534C" /></View><Text style={[styles.metricValue, { color: colors.foreground }]}>{review}</Text><Text style={[styles.metricLabel, { color: colors.muted }]}>Precisam revisão</Text></Pressable>
        </View>

        <View style={styles.sectionHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Ações rápidas</Text></View>
        <View style={styles.actionsRow}>
          <Pressable style={[styles.actionButton, { backgroundColor: '#FDE9E5' }]} onPress={startExpense}><View style={[styles.actionCircle, { backgroundColor: '#F26B5B' }]}><IconSymbol name="plus" size={22} color="#FFFFFF" /></View><Text style={[styles.actionText, { color: colors.foreground }]}>Nova despesa</Text></Pressable>
          <Pressable style={[styles.actionButton, { backgroundColor: '#E5F1F2' }]} onPress={() => router.push('/new-expense?scan=1')}><View style={[styles.actionCircle, { backgroundColor: colors.primary }]}><IconSymbol name="camera.fill" size={21} color="#FFFFFF" /></View><Text style={[styles.actionText, { color: colors.foreground }]}>Ler recibo</Text></Pressable>
          <Pressable style={[styles.actionButton, { backgroundColor: '#E8F3EC' }]} onPress={() => router.push('/insights' as any)}><View style={[styles.actionCircle, { backgroundColor: '#2D8A68' }]}><IconSymbol name="chart.bar.fill" size={21} color="#FFFFFF" /></View><Text style={[styles.actionText, { color: colors.foreground }]}>Analisar</Text></Pressable>
        </View>

        <View style={styles.sectionHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Orçamento por área</Text><Pressable onPress={() => router.push('/insights' as any)}><Text style={[styles.seeAll, { color: colors.primary }]}>Ver tudo</Text></Pressable></View>
        <View style={[styles.budgetCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>{budgetData.slice(0, 3).map((item) => <View key={item.name} style={styles.budgetItem}><View style={styles.budgetLine}><Text style={[styles.budgetName, { color: colors.foreground }]}>{item.name}</Text><Text style={[styles.budgetAmount, { color: colors.muted }]}>{formatCurrency(item.spent)} / {formatCurrency(item.limit)}</Text></View><View style={[styles.bar, { backgroundColor: '#E9EFED' }]}><View style={[styles.barFill, { backgroundColor: item.color, width: `${Math.round((item.spent / item.limit) * 100)}%` }]} /></View></View>)}</View>

        <View style={styles.sectionHeader}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Atividade recente</Text><Pressable onPress={() => router.push('/expenses')}><Text style={[styles.seeAll, { color: colors.primary }]}>Ver despesas</Text></Pressable></View>
        <View style={[styles.activityCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>{initialExpenses.slice(0, 3).map((item) => { const tone = statusTone(item.status); const pTone = policyTone(item.policy); return <Pressable key={item.id} style={styles.activityRow} onPress={() => router.push((`/expense/${item.id}`) as any)}><View style={[styles.activityDot, { backgroundColor: tone.bg }]}><IconSymbol name="doc.text.fill" size={18} color={tone.text} /></View><View style={styles.activityCopy}><Text style={[styles.activityMerchant, { color: colors.foreground }]}>{item.merchant}</Text><Text style={[styles.activityMeta, { color: colors.muted }]}>{item.category} · {item.date}</Text></View><View style={styles.activityRight}><Text style={[styles.activityAmount, { color: colors.foreground }]}>{formatCurrency(item.amount)}</Text><View style={[styles.miniPill, { backgroundColor: pTone.bg }]}><Text style={[styles.miniPillText, { color: pTone.text }]}>{item.policy}</Text></View></View></Pressable>; })}</View>

        <Pressable style={[styles.syncBanner, { backgroundColor: synced ? '#E5F4EE' : '#EAF3F4' }]} onPress={syncNow}><View style={[styles.syncIcon, { backgroundColor: synced ? '#2D8A68' : colors.primary }]}><IconSymbol name={synced ? 'checkmark' : 'sync'} size={18} color="#FFFFFF" /></View><View style={styles.syncCopy}><Text style={[styles.syncTitle, { color: colors.foreground }]}>{synced ? 'Tudo sincronizado' : 'Contabilidade conectada'}</Text><Text style={[styles.syncMeta, { color: colors.muted }]}>{synced ? 'Última atualização agora' : '2 despesas aguardam exportação'}</Text></View><IconSymbol name="chevron.right" size={20} color={colors.muted} /></Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 18, paddingBottom: 34 }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }, eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 1.1, marginBottom: 7 }, title: { fontSize: 29, fontWeight: '800', letterSpacing: -0.6 }, subtitle: { fontSize: 14, marginTop: 5 }, avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' }, avatarText: { fontWeight: '800', fontSize: 14 }, heroCard: { borderRadius: 22, padding: 20, marginBottom: 14 }, heroTop: { flexDirection: 'row', justifyContent: 'space-between' }, heroLabel: { color: '#BFE4E3', fontSize: 13, fontWeight: '600' }, heroValue: { color: '#FFFFFF', fontSize: 30, fontWeight: '800', marginTop: 7, letterSpacing: -0.5 }, heroIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.16)', alignItems: 'center', justifyContent: 'center' }, heroBottom: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 22, gap: 10 }, heroMeta: { color: '#BFE4E3', fontSize: 11 }, heroMetaValue: { color: '#FFFFFF', fontWeight: '700', fontSize: 13, marginTop: 2 }, heroProgress: { height: 6, flex: 1, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 5, overflow: 'hidden', marginBottom: 4 }, heroProgressFill: { width: '54%', height: '100%', backgroundColor: '#F26B5B', borderRadius: 5 }, heroPercent: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' }, metricsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 }, metricCard: { flex: 1, borderWidth: 1, borderRadius: 18, padding: 15 }, metricIcon: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }, metricValue: { fontSize: 24, fontWeight: '800' }, metricLabel: { fontSize: 12, marginTop: 3 }, sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11, marginTop: 5 }, sectionTitle: { fontSize: 17, fontWeight: '800' }, seeAll: { fontSize: 12, fontWeight: '700' }, actionsRow: { flexDirection: 'row', gap: 10, marginBottom: 25 }, actionButton: { flex: 1, borderRadius: 17, padding: 12, minHeight: 96 }, actionCircle: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }, actionText: { fontSize: 12, fontWeight: '700' }, budgetCard: { borderWidth: 1, borderRadius: 18, padding: 16, marginBottom: 24 }, budgetItem: { marginBottom: 15 }, budgetItemLast: { marginBottom: 0 }, budgetLine: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7 }, budgetName: { fontSize: 13, fontWeight: '700' }, budgetAmount: { fontSize: 11 }, bar: { height: 7, borderRadius: 6, overflow: 'hidden' }, barFill: { height: '100%', borderRadius: 6 }, activityCard: { borderWidth: 1, borderRadius: 18, paddingHorizontal: 14, marginBottom: 16 }, activityRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#EDF1EF' }, activityRowLast: { borderBottomWidth: 0 }, activityDot: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 11 }, activityCopy: { flex: 1 }, activityMerchant: { fontSize: 13, fontWeight: '700' }, activityMeta: { fontSize: 11, marginTop: 4 }, activityRight: { alignItems: 'flex-end', gap: 5 }, activityAmount: { fontSize: 12, fontWeight: '800' }, miniPill: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6 }, miniPillText: { fontSize: 9, fontWeight: '800' }, syncBanner: { borderRadius: 18, padding: 13, flexDirection: 'row', alignItems: 'center' }, syncIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginRight: 10 }, syncCopy: { flex: 1 }, syncTitle: { fontSize: 13, fontWeight: '800' }, syncMeta: { fontSize: 11, marginTop: 3 },
});
