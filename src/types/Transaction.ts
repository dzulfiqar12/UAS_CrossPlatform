/**
 * We do not use 'Menu' data type for our transaction item.
 */
type TransactionItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

/**
 * Data type for 'Transaction' entity.
 */
type Transaction = {
  id: string;
  customerName: string;
  items: TransactionItem[];
  tableName: string;
  totalPrice: number;
  created: number;
  status: 'In Progress' | 'Finished';
};

export default Transaction;
