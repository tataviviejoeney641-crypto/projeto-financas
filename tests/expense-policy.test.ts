import { describe, expect, it } from 'vitest';
import { initialExpenses, policyTone, statusTone } from '../lib/expense-data';

describe('regras visuais e operacionais de despesas', () => {
  it('mantém despesas conformes com o estado verde', () => {
    const expense = initialExpenses.find((item) => item.policy === 'Conforme');
    expect(expense).toBeDefined();
    expect(policyTone(expense!.policy).text).toBe('#2D8A68');
  });

  it('sinaliza despesas para revisão com atenção', () => {
    const expense = initialExpenses.find((item) => item.status === 'Revisar');
    expect(expense?.receipt).toBe(false);
    expect(policyTone('Revisar').bg).toBe('#FFF3DA');
  });

  it('separa itens em aprovação dos itens concluídos', () => {
    const pending = initialExpenses.filter((item) => item.status === 'Em aprovação');
    const completed = initialExpenses.filter((item) => item.status === 'Sincronizada' || item.status === 'Aprovada');
    expect(pending).toHaveLength(1);
    expect(completed.length).toBeGreaterThanOrEqual(2);
    expect(statusTone(pending[0].status).text).toBe('#0B5C66');
  });
});
