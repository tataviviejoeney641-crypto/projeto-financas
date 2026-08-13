export type ExpenseStatus = 'Em aprovação' | 'Aprovada' | 'Revisar' | 'Sincronizada';
export type PolicyState = 'Conforme' | 'Revisar' | 'Fora da política';

export type Expense = {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  date: string;
  status: ExpenseStatus;
  policy: PolicyState;
  costCenter: string;
  receipt: boolean;
  approver: string;
  level: string;
  note: string;
};

export const initialExpenses: Expense[] = [
  { id: 'EXP-1048', merchant: 'Hotel Aurora', category: 'Viagens', amount: 1280.4, date: '12 ago 2026', status: 'Em aprovação', policy: 'Conforme', costCenter: 'Vendas', receipt: true, approver: 'Mariana Costa', level: 'Nível 1 de 2', note: 'Conferência regional de clientes.' },
  { id: 'EXP-1047', merchant: 'CloudNine Software', category: 'Software', amount: 489.9, date: '11 ago 2026', status: 'Aprovada', policy: 'Conforme', costCenter: 'Produto', receipt: true, approver: 'Lucas Mendes', level: 'Concluído', note: 'Licenças mensais do time.' },
  { id: 'EXP-1046', merchant: 'Restaurante Lima', category: 'Alimentação', amount: 214.7, date: '10 ago 2026', status: 'Revisar', policy: 'Revisar', costCenter: 'Marketing', receipt: false, approver: 'Mariana Costa', level: 'Aguardando recibo', note: 'Almoço com cliente; falta anexo do recibo.' },
  { id: 'EXP-1045', merchant: 'Mobilidade Já', category: 'Transporte', amount: 86.2, date: '09 ago 2026', status: 'Sincronizada', policy: 'Conforme', costCenter: 'Operações', receipt: true, approver: 'Sistema contábil', level: 'Exportada', note: 'Deslocamento para reunião externa.' },
];

export const budgetData = [
  { name: 'Vendas', spent: 18240, limit: 24000, color: '#0B5C66' },
  { name: 'Marketing', spent: 10980, limit: 15000, color: '#F26B5B' },
  { name: 'Produto', spent: 8900, limit: 12000, color: '#C88719' },
  { name: 'Operações', spent: 6240, limit: 10000, color: '#2D8A68' },
];

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

export const policyTone = (policy: PolicyState) => {
  if (policy === 'Conforme') return { bg: '#E5F4EE', text: '#2D8A68' };
  if (policy === 'Revisar') return { bg: '#FFF3DA', text: '#9A6915' };
  return { bg: '#FCE8E6', text: '#C6534C' };
};

export const statusTone = (status: ExpenseStatus) => {
  if (status === 'Aprovada' || status === 'Sincronizada') return { bg: '#E5F4EE', text: '#2D8A68' };
  if (status === 'Revisar') return { bg: '#FFF3DA', text: '#9A6915' };
  return { bg: '#EAF3F4', text: '#0B5C66' };
};
