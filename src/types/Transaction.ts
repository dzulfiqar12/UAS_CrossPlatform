import Menu from './Menu';

/**
 * Data type for 'Transaction' entity.
 */
type Transaction = {
  id: string;
  customerName: string;
  items: Menu[];
  totalPrice: number;
  created: Date;
};

export default Transaction;
