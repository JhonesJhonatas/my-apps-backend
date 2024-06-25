export interface ICreateTransactionDto {
  type: 'expense' | 'income'
  title: string
  amount: number
  maturity: Date
  paid: boolean
  userId: string
  installmentsId?: string
  expenseType: 'detached' | 'fixed' | 'inInstallment'
}
