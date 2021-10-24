interface IRuleData {
  itemType: {
    vendor: string,
    quantity: string,
    amount: number,
    product: string
  },
  discountType: {
    amount: number,
    price: number
  }
}

export type { IRuleData };