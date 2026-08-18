const tableBody = document.getElementById('employees-table-body');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('employee-modal');
const form = document.getElementById('employee-form');

let editingId = null;
let searchQuery = '';

function render() {
  const all = getEmployees();
  const filtered = searchQuery
    ? all.filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()))
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
  modal.showModal();
}

document.getElementById('add-employee-btn').addEventListener('click', () => openModal(null));
document.getElementById('modal-cancel').addEventListener('click', () => modal.close());
document.getElementById('modal-close').addEventListener('click', () => modal.close());

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('emp-name').value.trim(),
    email: document.getElementById('emp-email').value.trim(),
    department: document.getElementById('emp-department').value,
    status: document.getElementById('emp-status').value,
  };

  if (!data.name || !data.email) return;

  if (editingId) {
    updateEmployee(editingId, data);
  } else {
    addEmployee(data);
  }

  modal.close();
  render();
});

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  render();
});

render();