import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import Routes from './Roures/Routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
 <div className='bg-gray-300 max-w-screen-2xl'>
     <RouterProvider  router={Routes}></RouterProvider>
 </div>
  </StrictMode>,
)
