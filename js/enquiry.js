const SUPABASE_URL = "https://rukadfxzljzffzpcipqh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1a2FkZnh6bGp6ZmZ6cGNpcHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMjIyMTcsImV4cCI6MjA5ODY5ODIxN30.KWCYPnWmNe30FKMC3X7B9KidBn4_DKB0QDkESj_VBrE";
const WHATSAPP_NUMBER = "919717233972";

const form = document.getElementById("enquiry-form");
const submitBtn = document.getElementById("submit-btn");
const statusBox = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const projectType = form.project_type.value;
  const budgetRange = form.budget_range.value;
  const message = form.message.value.trim();

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";
  statusBox.hidden = true;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        name,
        phone,
        project_type: projectType,
        budget_range: budgetRange,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Save failed with status ${response.status}`);
    }

    statusBox.textContent =
      "Thank you! Aapki enquiry receive ho gayi hai, hum WhatsApp par turant connect ho rahe hain.";
    statusBox.className = "form-status success";
    statusBox.hidden = false;

    const whatsappMessage = `Hi Black Bug, mera naam ${name} hai, mujhe ${projectType} ke liye enquiry karni hai, budget around ${budgetRange}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      window.location.href = whatsappUrl;
    }, 1500);
  } catch (err) {
    statusBox.textContent = "Something went wrong. Please try again.";
    statusBox.className = "form-status error";
    statusBox.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit Enquiry";
  }
});
