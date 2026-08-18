const employees = getEmployees();

document.getElementById('stat-total').textContent = employees.length;
document.getElementById('stat-active').textContent = employees.filter((e) => e.status === 'Active').length;
document.getElementById('stat-leave').textContent = employees.filter((e) => e.status === 'On Leave').length;
document.getElementById('stat-terminated').textContent = employees.filter((e) => e.status === 'Terminated').length;

const recentList = document.getElementById('recent-list');
const recent = employees.slice(0, 5);

if (recent.length === 0) {
  recentList.innerHTML = '<li>No employees yet.</li>';
} else {
  recent.forEach((emp) => {
    const li = document.createElement('li');

    const link = document.createElement('a');
    link.href = `e-details.html?id=${emp.id}`;
    link.textContent = emp.name;

    const badge = document.createElement('span');
    badge.className = `badge ${getStatusBadgeClass(emp.status)}`;
    badge.textContent = emp.status;

    li.append(link, badge);
    recentList.appendChild(li);
  });
}

const departmentList = document.getElementById('department-list');
const counts = employees.reduce((acc, emp) => {
  acc[emp.department] = (acc[emp.department] || 0) + 1;
  return acc;
}, {});
const departments = Object.entries(counts).sort((a, b) => b[1] - a[1]);

if (departments.length === 0) {
  departmentList.innerHTML = '<li>No employees yet.</li>';
} else {
  departments.forEach(([department, count]) => {
    const li = document.createElement('li');

    const label = document.createElement('span');
    label.textContent = department;

    const value = document.createElement('span');
    value.className = 'dept-count';
    value.textContent = count;

    li.append(label, value);
    departmentList.appendChild(li);
  });
}