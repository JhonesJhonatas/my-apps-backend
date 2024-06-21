export interface ICreateTransactionDto {
  type: string
  title: string
  amount: number
  maturity: Date
  paid: boolean
  userId: string
}
