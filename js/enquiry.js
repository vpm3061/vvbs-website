const SUPABASE_URL = "https://rukadfxzljzffzpcipqh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1a2FkZnh6bGp6ZmZ6cGNpcHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMjIyMTcsImV4cCI6MjA5ODY5ODIxN30.KWCYPnWmNe30FKMC3X7B9KidBn4_DKB0QDkESj_VBrE";
const WHATSAPP_NUMBER = "919717233972";
const form = document.getElementById("enquiry-form");
const submitBtn = document.getElementById("submit-btn");
const statusBox = document.getElementById("form-status");

function showStatus(message, type) {
  statusBox.textContent = message;
  statusBox.className = `form-status ${type}`;
  statusBox.hidden = false;
}

function validate(data) {
  if (!data.name || data.name.length < 2) return "Please enter your name.";
  if (!/^\+?[0-9\s-]{10,15}$/.test(data.phone)) return "Please enter a valid 10-digit phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return "Please enter a valid email address.";
  if (!data.project_type || !data.budget_range) return "Please select a service and budget range.";
  return "";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  Object.keys(data).forEach((key) => data[key] = data[key].trim());
  const validationError = validate(data);
  if (validationError) { showStatus(validationError, "error"); return; }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending your request…";
  statusBox.hidden = true;
  const enrichedMessage = [data.message, "Source: VVBSDigital website"].filter(Boolean).join("\n");
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/enquiries`, { method: "POST", headers: {"Content-Type": "application/json", apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, Prefer: "return=minimal"}, body: JSON.stringify({name: data.name, phone: data.phone, email: data.email, business_name: data.business_name || null, project_type: data.project_type, budget_range: data.budget_range, message: enrichedMessage, lead_source: "website", status: "new", metadata: { page: window.location.pathname, submitted_at: new Date().toISOString() }}) });
    if (!response.ok) throw new Error(`Save failed: ${response.status}`);
    showStatus("Thank you — your request is received. We’re opening WhatsApp so we can connect faster.", "success");
    const whatsappText = `Hi VVBSDigital, I am ${data.name}. I am interested in ${data.project_type}. My budget is ${data.budget_range}.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`;
    setTimeout(() => gtag_report_conversion(whatsappUrl), 700);
  } catch (error) {
    showStatus("We couldn’t submit this right now. Please try again or message us on WhatsApp.", "error");
    submitBtn.disabled = false;
    submitBtn.innerHTML = "Request Free Consultation <span>→</span>";
  }
});
