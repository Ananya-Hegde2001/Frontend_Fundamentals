function formatDuration(seconds) {
  const units = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];
  
  if (seconds === 0) return 'now';
  
  const parts = [];
  let remaining = seconds;
  
  for (let unit of units) {
    const count = Math.floor(remaining / unit.seconds);
    if (count > 0) {
      parts.push(`${count} ${unit.label}${count > 1 ? 's' : ''}`);
      remaining %= unit.seconds;
    }
    if (parts.length === 2) break; 
  }
  
  return parts.join(' and ');
}

console.log("\n=== BONUS Program 11: Format Duration ===");
console.log(formatDuration(3661));
console.log(formatDuration(90061));
console.log(formatDuration(45));