import TransactionForm from "../Pages/Transactions/TransactionForm";
import TransactionList from "../Pages/Transactions/TransactionList";

const TransactionRoutes = [
  {
    path: "/transactions/borrow",
    element: <TransactionForm type="borrow" />,
  },
  {
    path: "/transactions/return",
    element: <TransactionForm type="return" />,
  },
  {
    path: "/transactions",
    element: <TransactionList />,
  },
];

export default TransactionRoutes;
