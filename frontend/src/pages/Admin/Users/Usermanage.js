import Users from './Users';
import Dashboard from '../Dashboard';


function App() {
  return (
    <>
      <Dashboard title="User Management">
        <Users /> {/* Pass the Orders component as a child */}
      </Dashboard>

     
    </>
  );
}

export default App;
