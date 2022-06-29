/**
 * La forma como el instructor llama a los reducers es diferente a la sugerida por los
 * creadores de RTK. Normalmente, esperaríamos importar:
 * 
 * import authReducer from '../slices/auth/authSlices'
 * 
 * Y después invocarlo como:
 * 
 * auth: authReducer
 * 
 * La forma presentada aquí es más comprensible y trabaja de la forma esperada.
 */

import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../slices/auth/authSlices' // estilo Fernando Herrera

export const store = configureStore({
    reducer: {
      auth: authSlice.reducer, // estilo Fernando Herrera
    },
    // para el RTK Query API se requiere el middleware
    /* middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(todosApi.middleware), */
  })


