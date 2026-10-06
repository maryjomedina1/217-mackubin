// Posts the signup to the Kit form (id 10011254). Kit sends a confirmation
// email; the address is subscribed once the visitor confirms.
// If the background request fails, the form falls back to a normal post to Kit.
(function () {
  var form = document.getElementById('signup');
  var thanks = document.getElementById('thanks');
  var error = document.getElementById('signup-error');
  if (!form || !thanks || !error) return;
  var button = form.querySelector('button[type="submit"]');

  function showError(msg) {
    error.textContent = msg;
    error.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    error.hidden = true;
    button.disabled = true;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (res) { return res.json().then(function (body) { return { ok: res.ok, body: body }; }); })
      .then(function (r) {
        if (r.ok && r.body && r.body.status !== 'error') {
          form.hidden = true;
          thanks.hidden = false;
        } else {
          var msg = r.body && r.body.errors && r.body.errors[0];
          showError(msg || 'That address didn’t go through. Check it and try again.');
          button.disabled = false;
        }
      })
      .catch(function () {
        // Network or cross-origin failure: let the browser post the form to Kit directly.
        form.submit();
      });
  });
})();
