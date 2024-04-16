import { createHashRouter } from 'react-router-dom'

import Match from './pages/Match'
import SelectUser from './pages/SelectUser'
import Check from './pages/Check'
import SelectCurrency from './pages/SelectCurrency'
import SelectUsers from './pages/SelectUsers'
import SummaryHistory from './pages/SummaryHistory'
import Soon from './pages/Soon'

export const router = createHashRouter([
  {
    path: "/",
    element: <Match />,
    errorElement: <Match />,
  },
  {
    path: "*",
    element: <Match />,
  },
  {
    path: "/select-user",
    element: <SelectUser />,
  },
  {
    path: "/check",
    element: <Check />,
  },
  {
    path: "/select-currency",
    element: <SelectCurrency />,
  },
  {
    path: "/select-users",
    element: <SelectUsers />,
  },
  {
    path: "/summary",
    element: <SummaryHistory tab="summary" />,
  },
  {
    path: "/history",
    element: <SummaryHistory tab="history" />,
  },
  {
    path: "/soon",
    element: <Soon />,
  },
])
