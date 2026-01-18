function validateStrongPassword(password) {
  const checks = {
    length: password.length >= 12,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    noCommon: !['password', '123456', 'qwerty'].some(common => 
      password.toLowerCase().includes(common))
  };
  
  const passed = Object.values(checks).filter(Boolean).length;
  const isStrong = passed === 6;
  
  return {
    isStrong,
    score: passed,
    checks,
    feedback: !isStrong ? getPasswordFeedback(checks) : 'Strong password'
  };
}

function getPasswordFeedback(checks) {
  const feedback = [];
  if (!checks.length) feedback.push('Use at least 12 characters');
  if (!checks.lowercase) feedback.push('Add lowercase letters');
  if (!checks.uppercase) feedback.push('Add uppercase letters');
  if (!checks.number) feedback.push('Add numbers');
  if (!checks.special) feedback.push('Add special characters');
  if (!checks.noCommon) feedback.push('Avoid common passwords');
  return feedback.join(', ');
}

console.log("\n=== BONUS Program 6: Strong Password Validator ===");
console.log(validateStrongPassword("Pass123"));
console.log(validateStrongPassword("MyS3cur3P@ssw0rd!"));