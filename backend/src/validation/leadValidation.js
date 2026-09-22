export function validateLead(body) {
  const errors = [];
  const { name, company, phone, email } = body || {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("name is required");
  }
  if (!company || typeof company !== "string" || company.trim().length < 2) {
    errors.push("company is required");
  }
  if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
    errors.push("phone is required");
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("email is invalid");
  }
  return errors;
}
