function obfuscateEmail(email) {
  const [name, domain] = email.split('@');
  if (name.length <= 3) {
    return `${name[0]}***@${domain}`;
  }
  return `${name.slice(0, 2)}${'*'.repeat(name.length - 2)}@${domain}`;
}

console.log("\n=== BONUS Program 9: Obfuscate Email ===");
console.log(obfuscateEmail("john@example.com"));
console.log(obfuscateEmail("alice.smith@domain.com"));
console.log(obfuscateEmail("ab@test.com"));