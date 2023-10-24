import cx from 'classnames'
import { createHashRouter, RouterProvider } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { useTheme } from './hooks'
import { useStore } from './store'

import Check from './pages/Check'
import SelectUser from './pages/SelectUser'
import SelectCurrency from './pages/SelectCurrency'
import Start from './pages/Start'

import SplashScreen from './kit/SplashScreen'

const queryClient = new QueryClient()

function App() {
  const { isDarkTheme } = useTheme()
  const { txId } = useStore()

  const router = createHashRouter([
    {
      path: "/",
      element: (
        <Start />
      ),
      errorElement: (
        <Start />
      ),
    },
    {
      path: "*",
      element: (
        <Start />
      ),
    },
    {
      path: "/select-user",
      element: (
        <SelectUser />
      ),
    },
    {
      path: "/check",
      element: (
        <Check />
      ),
    },
    {
      path: "/select-currency",
      element: (
        <SelectCurrency />
      ),
    },
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <div className={cx(isDarkTheme ? 'theme-dark' : 'theme-light')}>
        <RouterProvider router={router} />
        <SplashScreen />
        {txId === null && (
          <div className="fixed bottom-0 width-auto left-[50%] -translate-x-[50%] text-[13px] font-semibold px-2 py-1 bg-[#3a3] text-white rounded-t-md">Демо-режим</div>
        )}
      </div>
    </QueryClientProvider>
  )
}

export default App