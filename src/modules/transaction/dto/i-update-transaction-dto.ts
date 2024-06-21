export interface IUpdateTransactionDto {
  id: string
  type?: string
  title?: string
  amount?: number
  maturity?: Date
  paid?: boolean
  userId?: string
}
