
// Deposit or withdraw selection box
const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit Amount', 'Amount to Withdraw'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label-small">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="300" onChange={onChange}></input>
      <input type="submit" disabled={!isValid} width="300" value="Submit" id="submit-input"></input>
    </label>
  );
};

// Account
const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Your Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(Number(event.target.value));
    if (Number(event.target.value) <= 0) {
      return setValidTransaction(false);
    }
    // disallow withdrawls greater than balance
    if (atmMode === 'Withdraw' && Number(event.target.value) > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };
  
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    console.log(event.target.value);
    setAtmMode(event.target.value);
    setValidTransaction(false);
    if (event.target.value === 'Deposit') {
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  };
// dropdown menu
  return (
    <form onSubmit={handleSubmit}>
      <>
      
        <h5 id="total">{status}</h5> 
        <label>Select deposit or withdrawl from the menu below. Please note that you will not be able to withdraw more than your account balance.</label>
          <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
            <option id="no-selection" value="" ></option>
            <option id="deposit-selection" value="Deposit">
              Deposit Funds
            </option>
            <option id="withdraw-selection" value="Withdraw">
              Withdraw Funds
            </option>
          </select>
        {atmMode && (
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
            isValid={validTransaction}
          ></ATMDeposit>
        )}
      </>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
