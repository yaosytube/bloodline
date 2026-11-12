"use strict";
/* ====== CONFIGURE THESE TWO VALUES (Supabase > Project Settings > API) ====== */
const SUPABASE_URL = "https://xxxx.supabase.co";
const SUPABASE_KEY = "your-anon-or-publishable-key";
/* ============================================================================ */

const ALLOWED = ["Roman Reigns", "Jey Uso", "Jimmy Uso", "Solo Sikoa", "Paul Heyman"];

document.addEventListener("DOMContentLoaded", () => {
  // Lock the page for this browser session once joined
  if (sessionStorage.getItem("bloodline_joined") === "1") {
    window.location.replace("welcome.html");
    return;
  }

  const form = document.getElementById("registrationForm");
  const msg = document.getElementById("formMessage");
  const button = form.querySelector("button[type=submit]");

  const show = (text, ok = false) => {
    msg.textContent = text;
    msg.style.display = "block";
    msg.classList.toggle("success", ok);
    msg.classList.toggle("error", !ok);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.fan_name.value.trim();
    const email = form.email.value.trim().toLowerCase();
    const favorite = form.favorite.value;
    const acknowledged = form.acknowledge.checked;

    if (name.length < 2 || name.length > 60) return show("Name must be 2 to 60 characters.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) return show("Please enter a valid email address.");
    if (!ALLOWED.includes(favorite)) return show("Please choose your favourite member.");
    if (!acknowledged) return show("You must acknowledge the Tribal Chief to join.");

    button.disabled = true;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/fan_registrations`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({ fan_name: name, email: email, favorite_member: favorite, acknowledged: true })
      });

      if (res.status === 201) {
        sessionStorage.setItem("bloodline_joined", "1");
        sessionStorage.setItem("fan_name", name);
        window.location.href = "welcome.html";
        return;
      }
      if (res.status === 409) {
        show("This email is already registered.");
      } else {
        console.error(res.status, await res.text());
        show("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      show("Network error. Please try again.");
    } finally {
      button.disabled = false;
    }
  });
});
