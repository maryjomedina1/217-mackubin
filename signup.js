// Placeholder behavior from the mockup: shows the confirmation without
// sending the address anywhere. Replace with a real endpoint before launch.
(function () {
  var form = document.getElementById('signup');
  var thanks = document.getElementById('thanks');
  if (!form || !thanks) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    form.hidden = true;
    thanks.hidden = false;
  });
})();
