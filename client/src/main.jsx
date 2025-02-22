import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { appStore } from './app/store';
import { useLoadUserQuery } from './features/api/authApi';
import { Toaster } from './components/ui/sonner';
import LoadingSpinner from './components/LoadingSpinner';

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return(
  <>
    {
      isLoading ? <LoadingSpinner/> : <>{children}</>
    }
  </>
  )
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <App />
      </Custom>
      <Toaster />
    </Provider>
  </StrictMode>
)
