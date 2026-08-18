document.getElementById('current-user-email').textContent =
  sessionStorage.getItem('ems_user_email') || 'Not logged in';

document.getElementById('logout-btn').addEventListener('click', () => {
  sessionStorage.removeItem('ems_user_email');
  window.location.href = 'login.html';
});

document.getElementById('reset-data-btn').addEventListener('click', () => {
  const input = prompt('This will permanently erase all employee data and cannot be undone.\n\nType RESET to confirm:');
  if (input === null) return;

  if (input.trim() === 'RESET') {
    resetEmployees();
    alert('Data has been reset.');
  } else {
    alert('Reset cancelled — input did not match "RESET".');
  }
});