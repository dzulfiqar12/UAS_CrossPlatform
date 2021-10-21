import { ReactNode, useEffect, useMemo, useReducer } from 'react';

import OrderContext, { DefaultContext } from '../utils/context';
import ContextReducer from '../utils/reducer';

/**
 * Context Provider helps to inject the context to the application.
 *
 * @param children React Node to act as the children
 * @returns React Functional Component
 */
const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ContextReducer, DefaultContext);

  useEffect(() => {
    dispatch({ type: 'initializeContext', payload: DefaultContext });
  }, []);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export default ContextProvider;
