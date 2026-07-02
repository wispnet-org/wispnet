const targetUrl = "https://eitkek.com";
let timeLeft = 7;
let cancelled = false;

const countdownEl = document.getElementById("countdown");

const timer = setInterval(() => {
  if (cancelled) {
    clearInterval(timer);
    countdownEl.textContent = "cancelled";
    return;
  }

  timeLeft--;
  countdownEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    window.location.href = targetUrl;
  }
}, 1000);

    function cancelRedirect() {
      cancelled = true;
    }
