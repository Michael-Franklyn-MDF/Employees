const content = document.getElementById('profile-content');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const employee = id ? getEmployeeById(id) : null;

if (!employee) {
  content.innerHTML = '<p>Employee not found.</p>';
} else {
  render(employee);
}

function render(emp) {
  content.innerHTML = '';

  const name = document.createElement('h2');
  name.className = 'profile-name';
  name.textContent = emp.name;

  const badge = document.createElement('span');
  badge.className = `badge ${getStatusBadgeClass(emp.status)}`;
  badge.textContent = emp.status;

  const grid = document.createElement('div');
  grid.className = 'detail-grid';

  const emailBlock = document.createElement('div');
  emailBlock.innerHTML = '<div class="detail-label">Email</div>';
  const emailValue = document.createElement('div');
  emailValue.textContent = emp.email;
  emailBlock.appendChild(emailValue);

  const deptBlock = document.createElement('div');
  deptBlock.innerHTML = '<div class="detail-label">Department</div>';
  const deptValue = document.createElement('div');
  deptValue.textContent = emp.department;
  deptBlock.appendChild(deptValue);

  grid.append(emailBlock, deptBlock);

  const actions = document.createElement('div');
  actions.className = 'profile-actions';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'danger';
  deleteBtn.textContent = 'Delete Employee';
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

  actions.appendChild(deleteBtn);
  content.append(name, badge, grid, actions);
}