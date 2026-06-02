(() => {
  class EmployeeAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
      e.preventDefault();
      const form = document.forms.employeeAdd;
      const employee = {
        name: form.name.value,
        ext: form.ext.value,
        email: form.email.value,
        title: form.title.value,
        dateHired: new Date(),
        isEmployed: true,
      };
      this.props.createEmployee(employee);
      form.name.value = '';
      form.ext.value = '';
      form.email.value = '';
      form.title.value = '';
    }

    render() {
      return React.createElement(
        'form',
        { name: 'employeeAdd', onSubmit: this.handleSubmit },
        'Name: ', React.createElement('input', { type: 'text', name: 'name' }), React.createElement('br'),
        'Extension: ', React.createElement('input', { type: 'text', name: 'ext' }), React.createElement('br'),
        'Email: ', React.createElement('input', { type: 'text', name: 'email' }), React.createElement('br'),
        'Title: ', React.createElement('input', { type: 'text', name: 'title' }), React.createElement('br'),
        React.createElement('button', null, 'Add')
      );
    }
  }

  class EmployeeFilter extends React.Component {
    render() {
      return React.createElement('div', null, 'This is a placeholder for the employee filter.');
    }
  }

  const initialEmployees = [
    { id: 1, name: 'Zak Ruvalcaba', ext: 1124, email: 'zak@vectacorp.com', title: 'Chief Executive Officer', dateHired: new Date('2018-08-15'), isEmployed: true },
    { id: 2, name: 'Sally Smith', ext: 1125, email: 'sally@vectacorp.com', title: 'Director of Sales', dateHired: new Date('2015-01-03'), isEmployed: true },
  ];

  function EmployeeRow(props) {
    const employee = props.employee;
    return React.createElement(
      'tr',
      null,
      React.createElement('td', null, employee.id),
      React.createElement('td', null, employee.name),
      React.createElement('td', null, employee.ext),
      React.createElement('td', null, employee.email),
      React.createElement('td', null, employee.title),
      React.createElement('td', null, employee.dateHired.toDateString()),
      React.createElement('td', null, employee.isEmployed ? 'Yes' : 'No')
    );
  }

  function EmployeeTable(props) {
    const rows = props.employees.map((employee) => React.createElement(EmployeeRow, { key: employee.id, employee: employee }));
    return React.createElement(
      'table',
      { className: 'bordered-table' },
      React.createElement('thead', null,
        React.createElement('tr', null,
          React.createElement('th', null, 'ID'),
          React.createElement('th', null, 'Name'),
          React.createElement('th', null, 'Extension'),
          React.createElement('th', null, 'Email'),
          React.createElement('th', null, 'Title'),
          React.createElement('th', null, 'Date Hired'),
          React.createElement('th', null, 'Currently Employed?')
        )
      ),
      React.createElement('tbody', null, rows)
    );
  }

  class EmployeeList extends React.Component {
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
      return React.createElement(
        React.Fragment,
        null,
        React.createElement('h1', null, 'Employee Management Application'),
        React.createElement(EmployeeFilter, null),
        React.createElement('hr', null),
        React.createElement(EmployeeTable, { employees: this.state.employees }),
        React.createElement('hr', null),
        React.createElement(EmployeeAdd, { createEmployee: this.createEmployee })
      );
    }
  }

  ReactDOM.render(
    React.createElement(React.StrictMode, null, React.createElement(EmployeeList, null)),
    document.getElementById('content')
  );
})();
