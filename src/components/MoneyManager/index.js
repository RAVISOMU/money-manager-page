import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    title: '',
    amount: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({optionId: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()

    const {title, amount, transactionList, optionId} = this.state

    const optionType = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )

    const {displayText} = optionType
    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      type: displayText,
    }
    const updatedList = [...transactionList, newTransaction]

    this.setState({
      transactionList: updatedList,
      title: '',
      amount: '',
      optionId: transactionTypeOptions[0].optionId,
    })
  }

  onDeleteTransaction = id => {
    const {transactionList} = this.state
    const filteredList = transactionList.filter(
      eachTransaction => eachTransaction.id !== id,
    )

    this.setState({transactionList: filteredList})
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expensesAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  render() {
    const {title, amount, transactionList, optionId} = this.state
    const balance = this.getBalance()
    const income = this.getIncome()
    const expenses = this.getExpenses()
    return (
      <div className="money-manager-bg-container">
        <div className="money-manager-responsive-container">
          <div className="money-manager-section-bg-container">
            <div className="money-manager-header-container">
              <div className="name-description-container">
                <h1 className="name-heading">Hi, Richard</h1>
                <p className="welcome-description">
                  Welcome back to your <span>Money Manager</span>
                </p>
              </div>
            </div>
            <MoneyDetails
              income={income}
              balance={balance}
              expenses={expenses}
            />
            <div className="money-manager-transactions-container">
              <div className="transactions-input-container">
                <h1 className="add-transaction-heading">Add Transaction</h1>
                <form
                  className="input-label-container"
                  onSubmit={this.onAddTransaction}
                >
                  <label htmlFor="titleInput" className="label-text">
                    TITLE
                  </label>
                  <input
                    placeholder="TITLE"
                    value={title}
                    type="text"
                    className="user-input"
                    id="titleInput"
                    onChange={this.onChangeTitle}
                  />
                  <label htmlFor="amountInput" className="label-text">
                    AMOUNT
                  </label>
                  <input
                    placeholder="AMOUNT"
                    value={amount}
                    type="text"
                    className="user-input"
                    id="amountInput"
                    onChange={this.onChangeAmount}
                  />
                  <label htmlFor="typeInput" className="label-text">
                    TYPE
                  </label>
                  <select
                    className="user-input"
                    value={optionId}
                    onChange={this.onChangeType}
                  >
                    {transactionTypeOptions.map(eachOption => (
                      <option
                        key={eachOption.optionId}
                        value={eachOption.optionId}
                      >
                        {eachOption.displayText}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </form>
              </div>
              <div className="transactions-history-container">
                <h1 className="history-heading">History</h1>
                <ul className="transactions-history-list">
                  <li className="transactions-history-headings">
                    <p className="heading">Title</p>
                    <p className="heading">Amount</p>
                    <p className="heading">Type</p>
                  </li>
                  {transactionList.map(eachTransaction => (
                    <TransactionItem
                      eachTransaction={eachTransaction}
                      key={eachTransaction.id}
                      onDeleteTransaction={this.onDeleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
