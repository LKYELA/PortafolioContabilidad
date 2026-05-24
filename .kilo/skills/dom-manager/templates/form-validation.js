// form-validation.js
/**
 * Form validation utilities
 */

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validates a URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid
 */
function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Validates that a field is not empty
 * @param {string} value - The value to check
 * @returns {boolean} - True if not empty
 */
function validateRequired(value) {
  return value.trim() !== '';
}

/**
 * Validates minimum length
 * @param {string} value - The value to check
 * @param {number} min - Minimum length
 * @returns {boolean} - True if meets minimum
 */
function validateMinLength(value, min) {
  return value.length >= min;
}

/**
 * Validates maximum length
 * @param {string} value - The value to check
 * @param {number} max - Maximum length
 * @returns {boolean} - True if meets maximum
 */
function validateMaxLength(value, max) {
  return value.length <= max;
}

/**
 * Validates a numeric value
 * @param {string} value - The value to check
 * @returns {boolean} - True if numeric
 */
function validateNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Validates that a value matches a pattern (regex)
 * @param {string} value - The value to check
 * @param {RegExp} pattern - The regex pattern
 * @returns {boolean} - True if matches
 */
function validatePattern(value, pattern) {
  return pattern.test(value);
}

/**
 * Sets a custom validation message on an input
 * @param {HTMLInputElement} input - The input element
 * @param {string} message - The validation message (empty for valid)
 */
function setValidationMessage(input, message) {
  if (input.setCustomValidity) {
    input.setCustomValidity(message);
  }
  // Also set aria-invalid for accessibility
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

/**
 * Validates a form and returns validation results
 * @param {HTMLFormElement} form - The form to validate
 * @returns {Object} - Object with isValid and fieldErrors
 */
function validateForm(form) {
  const fields = form.querySelectorAll('input, select, textarea');
  const fieldErrors = {};
  let isValid = true;
  
  fields.forEach(field => {
    // Skip if field is disabled or not a name field
    if (field.disabled || !field.name) return;
    
    const value = field.value;
    let fieldValid = true;
    let messages = [];
    
    // Check required
    if (field.hasAttribute('required') && !validateRequired(value)) {
      fieldValid = false;
      messages.push('This field is required');
    }
    
    // Check pattern if present
    if (field.hasAttribute('pattern') && value) {
      const pattern = new RegExp(field.getAttribute('pattern'));
      if (!validatePattern(value, pattern)) {
        fieldValid = false;
        messages.push(field.title || 'Please match the requested format');
      }
    }
    
    // Check minlength
    if (field.hasAttribute('minlength')) {
      const min = parseInt(field.getAttribute('minlength'), 10);
      if (!validateMinLength(value, min)) {
        fieldValid = false;
        messages.push(`Please enter at least ${min} characters`);
      }
    }
    
    // Check maxlength
    if (field.hasAttribute('maxlength')) {
      const max = parseInt(field.getAttribute('maxlength'), 10);
      if (!validateMaxLength(value, max)) {
        fieldValid = false;
        messages.push(`Please enter no more than ${max} characters`);
      }
    }
    
    // Custom validation based on type
    if (field.type === 'email' && value && !validateEmail(value)) {
      fieldValid = false;
      messages.push('Please enter a valid email address');
    }
    
    if (field.type === 'url' && value && !validateURL(value)) {
      fieldValid = false;
      messages.push('Please enter a valid URL');
    }
    
    if (field.type === 'number' && value && !validateNumeric(value)) {
      fieldValid = false;
      messages.push('Please enter a valid number');
    }
    
    // Store errors if any
    if (!fieldValid) {
      isValid = false;
      fieldErrors[field.name] = messages;
    }
    
    // Set custom validation message for browser UI
    const message = messages.join('. ') + (messages.length ? '.' : '');
    setValidationMessage(field, message);
  });
  
  return { isValid, fieldErrors };
}

/**
 * Shows validation errors in the UI
 * @param {HTMLFormElement} form - The form element
 * @param {Object} fieldErrors - Object mapping field names to error messages
 */
function showFormErrors(form, fieldErrors) {
  // Clear existing errors
  form.querySelectorAll('.error-message').forEach(el => el.remove());
  
  Object.entries(fieldErrors).forEach(([fieldName, messages]) => {
    const field = form.elements.namedItem(fieldName);
    if (!field) return;
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    // If multiple messages, join them
    const messageText = Array.isArray(messages) ? messages.join('. ') : messages;
    errorDiv.textContent = messageText;
    
    // Insert after the field
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
    
    // Add error class to field
    field.classList.add('error');
  });
}

/**
 * Clears validation errors from the form
 * @param {HTMLFormElement} form - The form element
 */
function clearFormErrors(form) {
  form.querySelectorAll('.error-message').forEach(el => el.remove());
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  form.querySelectorAll('input, select, textarea').forEach(field => {
    setValidationMessage(field, '');
  });
}

// Usage examples:
// const form = document.getElementById('myForm');
// form.addEventListener('submit', function(e) {
//   e.preventDefault();
//   const { isValid, fieldErrors } = validateForm(form);
//   if (isValid) {
//     // Submit form
//     console.log('Form is valid');
//   } else {
//     showFormErrors(form, fieldErrors);
//   }
// });