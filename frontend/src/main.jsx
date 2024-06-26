import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppContextProvider } from './context/AppContext.jsx'
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(

   <QueryClientProvider client={queryClient}>
  <AppContextProvider >
  <App />

  </AppContextProvider>
  </QueryClientProvider>
   
  
)
