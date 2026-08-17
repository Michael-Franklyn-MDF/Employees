document.getElementById('current-user-email').textContent =
  sessionStorage.getItem('ems_user_email') || 'Not logged in';

document.getElementById('logout-btn').addEventListener('click', () => {
  sessionStorage.removeItem('ems_user_email');
  window.location.href = 'login.html';
});

document.getElementById('reset-data-btn').addEventListener('click', () => {
  if (confirm('Reset all employee data to the sample defaults? This cannot be undone.')) {
    resetEmployees();
    alert('Data has been reset.');
  }
});