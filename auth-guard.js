// Auth guard — aktifkan saat diperlukan dengan: <script src="auth-guard.js"></script>
if (!localStorage.getItem('fituser')) {
  window.location.href = 'login.html';
}
