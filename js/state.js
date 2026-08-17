const STORAGE_KEY = 'ems_employees';

const STATUS_BADGE_CLASS = {
  Active: 'badge--active',
  'On Leave': 'badge--leave',
  Terminated: 'badge--terminated',
};

function getStatusBadgeClass(status) {
  return STATUS_BADGE_CLASS[status] || 'badge--terminated';
}

function getEmployees() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    saveEmployees(SEED_EMPLOYEES);
    return [...SEED_EMPLOYEES];
  }
  try {
    return JSON.parse(stored);
  } catch {
    saveEmployees(SEED_EMPLOYEES);
    return [...SEED_EMPLOYEES];
  }
}

function saveEmployees(employees) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    return true;
  } catch {
    return false;
  }
}

function getEmployeeById(id) {
  return getEmployees().find((emp) => emp.id === id) || null;
}

function addEmployee(data) {
  const employees = getEmployees();
  const employee = {
    id: `emp_${crypto.randomUUID()}`,
    name: data.name,
    email: data.email,
    department: data.department,
    status: data.status,
  };
  employees.unshift(employee);
  saveEmployees(employees);
  return employee;
}

function updateEmployee(id, data) {
  const employees = getEmployees();
  const index = employees.findIndex((emp) => emp.id === id);
  if (index === -1) return null;

  employees[index] = { ...employees[index], ...data };
  saveEmployees(employees);
  return employees[index];
}

function deleteEmployee(id) {
  const employees = getEmployees();
  const filtered = employees.filter((emp) => emp.id !== id);
  saveEmployees(filtered);
  return filtered.length < employees.length;
}

function resetEmployees() {
  saveEmployees(SEED_EMPLOYEES);
}