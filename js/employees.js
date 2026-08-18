const tableBody = document.getElementById('employees-table-body');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('employee-modal');
const form = document.getElementById('employee-form');

let editingId = null;
let searchQuery = '';

function render() {
  const all = getEmployees();
  const query = searchQuery.toLowerCase();
  const filtered = searchQuery
    ? all.filter((e) =>
        e.name.toLowerCase().includes(query) ||
        e.email.toLowerCase().includes(query) ||
        e.department.toLowerCase().includes(query)
      )
    : all;

  tableBody.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.style.display = 'block';
    document.getElementById('employees-table').style.display = 'none';
    return;
  }

  emptyState.style.display = 'none';
  document.getElementById('employees-table').style.display = 'table';

  filtered.forEach((emp) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    const nameLink = document.createElement('a');
    nameLink.href = `e-details.html?id=${emp.id}`;
    nameLink.textContent = emp.name;
    nameCell.appendChild(nameLink);

    const deptCell = document.createElement('td');
    deptCell.textContent = emp.department;

    const statusCell = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = `badge ${getStatusBadgeClass(emp.status)}`;
    badge.textContent = emp.status;
    statusCell.appendChild(badge);

    const emailCell = document.createElement('td');
    emailCell.textContent = emp.email;

    const actionsCell = document.createElement('td');
    actionsCell.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'secondary';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => openModal(emp));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'danger';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      const input = prompt(`This will permanently delete ${emp.name}'s record and cannot be undone.\n\nType the employee's name to confirm:`);
      if (input === null) return;

      if (input.trim() === emp.name) {
        deleteEmployee(emp.id);
        render();
      } else {
        alert('Deletion cancelled — name did not match.');
      }
    });
    
    actionsCell.append(editBtn, deleteBtn);
    row.append(nameCell, deptCell, statusCell, emailCell, actionsCell);
    tableBody.appendChild(row);
  });
}

function openModal(employee) {
  editingId = employee ? employee.id : null;
  document.getElementById('modal-title').textContent = employee ? 'Edit Employee' : 'Add Employee';
  document.getElementById('emp-name').value = employee?.name || '';
  document.getElementById('emp-email').value = employee?.email || '';
  document.getElementById('emp-department').value = employee?.department || 'Engineering';
  document.getElementById('emp-status').value = employee?.status || 'Active';
  clearFormErrors();
  modal.showModal();
}

document.getElementById('add-employee-btn').addEventListener('click', () => openModal(null));
document.getElementById('modal-cancel').addEventListener('click', () => modal.close());
document.getElementById('modal-close').addEventListener('click', () => modal.close());

const nameInput = document.getElementById('emp-name');
const emailInput = document.getElementById('emp-email');
const nameError = document.getElementById('error-name');
const emailError = document.getElementById('error-email');

function clearFormErrors() {
  nameInput.classList.remove('error');
  emailInput.classList.remove('error');
  nameError.textContent = '';
  emailError.textContent = '';
}

function showFieldError(input, errorEl, message) {
  input.classList.add('error');
  errorEl.textContent = message;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearFormErrors();

  const data = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    department: document.getElementById('emp-department').value,
    status: document.getElementById('emp-status').value,
  };

  let valid = true;

  if (!data.name) {
    showFieldError(nameInput, nameError, 'Name is required.');
    valid = false;
  }

  if (!data.email) {
    showFieldError(emailInput, emailError, 'Email is required.');
    valid = false;
  } else if (!EMAIL_PATTERN.test(data.email)) {
    showFieldError(emailInput, emailError, 'Enter a valid email address.');
    valid = false;
  }

  if (!valid) return;

  if (editingId) {
    updateEmployee(editingId, data);
  } else {
    addEmployee(data);
  }

  modal.close();
  render();
});