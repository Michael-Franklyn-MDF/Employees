document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  document.getElementById('error-email').textContent = '';
  document.getElementById('error-password').textContent = '';

  let valid = true;

  if (!email) {
    document.getElementById('error-email').textContent = 'Email is required';
    valid = false;
  }

  if (!password) {
    document.getElementById('error-password').textContent = 'Password is required';
    valid = false;
  }

  if (!valid) return;

  // Simulated login only — accepts any email/password combo.
  sessionStorage.setItem('ems_user_email', email);
  window.location.href = 'dashboard.html';
});