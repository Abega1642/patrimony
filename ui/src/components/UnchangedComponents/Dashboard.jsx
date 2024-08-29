import { FaChartLine, FaMoneyBillWave } from 'react-icons/fa'; // Utilisation d'icônes de react-icons

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Yε:rPatrimony</h1>
      <ul className="dashboard-menu">
        <li>
          <a href="#graph">
            <FaChartLine /> Graphs
          </a>
        </li>
        <li>
          <a href="#values">
            <FaMoneyBillWave /> Valeurs de Patrimoine
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
