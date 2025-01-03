const BACKEND_URL = 'http://localhost:5000';

// Show the selected section
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach((section) => {
    section.classList.remove('active');
    if (section.id === sectionId) section.classList.add('active');
  });

  // Update page title dynamically
  const pageTitle = sectionId.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  document.getElementById('page-title').innerText = pageTitle;
}

// Add Contact
async function addContact() {
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const phone = document.getElementById('contact-phone').value;

  try {
    await fetch(`${BACKEND_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, userId: 1 }),
    });
    alert('Contact added successfully!');
  } catch (err) {
    console.error('Error adding contact:', err);
  }
}

// Log Activity
async function logActivity() {
  const description = document.getElementById('activity-description').value;
  const date = document.getElementById('activity-date').value;

  try {
    await fetch(`${BACKEND_URL}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, activity_date: date, userId: 1 }),
    });
    alert('Activity logged successfully!');
  } catch (err) {
    console.error('Error logging activity:', err);
  }
}

// Add Opportunity
async function addOpportunity() {
  const title = document.getElementById('opportunity-title').value;
  const dealValue = document.getElementById('opportunity-value').value;
  const status = document.getElementById('opportunity-status').value;

  try {
    await fetch(`${BACKEND_URL}/opportunities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, deal_value: dealValue, status, userId: 1 }),
    });
    alert('Opportunity added successfully!');
  } catch (err) {
    console.error('Error adding opportunity:', err);
  }
}
