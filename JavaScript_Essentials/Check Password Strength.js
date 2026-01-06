function checkPasswordStrength(password) {
  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  strength = Object.values(checks).filter(Boolean).length;
  
  const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  return {
    strength: levels[strength],
    score: strength,
    checks: checks
  };
}

console.log("=== Program 1: Password Strength Checker ===");
console.log(checkPasswordStrength("abc")); 
console.log(checkPasswordStrength("Abc123")); 
console.log(checkPasswordStrength("Abc123!@#")); 