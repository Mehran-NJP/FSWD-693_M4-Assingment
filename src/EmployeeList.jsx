import EmployeeFilter from './EmployeeFilter.jsx';
import EmployeeAdd from './EmployeeAdd.jsx';

const initialEmployees = [
  {
    id: 1,
    name: 'Zak Ruvalcaba',
    ext: 1124,
    email: 'zak@vectacorp.com',
    title: 'Chief Executive Officer',
    dateHired: new Date('2018-08-15'),
    isEmployed: true,
  },
  {
    id: 2,
    name: 'Sally Smith',
    ext: 1125,
    email: 'sally@vectacorp.com',
    title: 'Director of Sales',
    dateHired: new Date('2015-01-03'),
    isEmployed: true,
  },
];

function EmployeeRow(props) {
  const employee = props.employee;

  return (
    <tr>
      <td>{employee.id}</td>
      <td>{employee.name}</td>
      <td>{employee.ext}</td>
      <td>{employee.email}</td>
      <td>{employee.title}</td>
      <td>{employee.dateHired.toDateString()}</td>
      <td>{employee.isEmployed ? 'Yes' : 'No'}</td>
    </tr>
  );
}

function EmployeeTable(props) {
  const rows = props.employees.map((employee) => (
    <EmployeeRow key={employee.id} employee={employee} />
  ));

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Extension</th>
          <th>Email</th>
          <th>Title</th>
          <th>Date Hired</th>
          <th>Currently Employed?</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default class EmployeeList extends React.Component {
  constructor() {
    super();
    this.state = { employees: [] };
    this.createEmployee = this.createEmployee.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ employees: initialEmployees });
    }, 500);
  }

  createEmployee(employee) {
    employee.id = this.state.employees.length + 1;

    const newEmployeeList = this.state.employees.slice();
    newEmployeeList.push(employee);

    this.setState({ employees: newEmployeeList });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Employee Management Application</h1>
        <EmployeeFilter />
        <hr />
        <EmployeeTable employees={this.state.employees} />
        <hr />
        <EmployeeAdd createEmployee={this.createEmployee} />
      </React.Fragment>
    );
  }
}
