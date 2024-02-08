import './index.css'

const TransactionItem = props => {
  const {eachTransaction, onDeleteTransaction} = props
  const {title, amount, id, type} = eachTransaction

  const onClickDeleteButton = () => {
    onDeleteTransaction(id)
  }

  return (
    <li className="transaction-history-item">
      <p className="title">{title}</p>
      <p className="amount">Rs {amount}</p>
      <p className="type">{type}</p>
      <button
        className="delete-button"
        type="button"
        data-testid="delete"
        onClick={onClickDeleteButton}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default TransactionItem
