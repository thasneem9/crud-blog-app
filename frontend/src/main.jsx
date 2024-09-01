
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {ChakraProvider} from "@chakra-ui/react"
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext.jsx'
import { RecoilRoot } from 'recoil'
import 'setimmediate';

import 'babel-polyfill';
createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <RecoilRoot>
    <BrowserRouter>
<AuthProvider>
    <App />
    </AuthProvider>
    </BrowserRouter>
    </RecoilRoot>
  </ChakraProvider>,
)
