/**
 * A transaction item plus a unique ID as the data identifier in the context.
 */
type Item = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

/**
 * Main configuratinon type.
 */
export type Context = {
  customerName: string;
  items: Item[];
  tableName: string;
};

/**
 * Initializes a context based on an available data.
 */
export type InitializeContextAction = {
  type: 'initializeContext';
  payload: Context;
};

/**
 * Action type to add a new order item.
 */
export type AddNewOrderItemAction = {
  type: 'addNewOrderItem';
  payload: Item;
};

/**
 * Action type to delete an order item.
 */
export type DeleteOrderItemAction = {
  type: 'deleteOrderItem';
  payload: string;
};

/**
 * Action type to reset an order.
 */
export type DeleteOrderItemsAction = {
  type: 'deleteOrderItems';
  payload: null;
};

/**
 * Action type to set the quantity of an order.
 */
export type SetOrderItemQuantityAction = {
  type: 'setOrderItemQuantity';
  payload: {
    id: string;
    newQuantity: number;
  };
};

/**
 * Action type to set the name of the customer.
 */
export type SetCustomerNameAction = {
  type: 'setCustomerName';
  payload: string;
};

/**
 * Action type to set the name of a table.
 */
export type SetTableNameAction = {
  type: 'setTableName';
  payload: string;
};

/**
 * Action type to reset the context.
 */
export type ResetContextAction = {
  type: 'resetContext';
  payload: null;
};

/**
 * Represents a data type for all possible reducer methods and arguments.
 */
export type Action =
  | InitializeContextAction
  | AddNewOrderItemAction
  | DeleteOrderItemAction
  | DeleteOrderItemsAction
  | SetOrderItemQuantityAction
  | SetCustomerNameAction
  | SetTableNameAction
  | ResetContextAction;
