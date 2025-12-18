function palindromePartition(str) {
  const result = [];
  
  const isPalindrome = (s, left, right) => {
    while (left < right) {
      if (s[left] !== s[right]) return false;
      left++;
      right--;
    }
    return true;
  };
  
  const backtrack = (start, path) => {
    if (start === str.length) {
      result.push([...path]);
      return;
    }
    
    for (let end = start; end < str.length; end++) {
      if (isPalindrome(str, start, end)) {
        path.push(str.substring(start, end + 1));
        backtrack(end + 1, path);
        path.pop();
      }
    }
  };
  
  backtrack(0, []);
  return result;
}

console.log("\n=== Program 2: Palindrome Partitioning ===");
console.log(palindromePartition("aab"));
console.log(palindromePartition("a"));
console.log(palindromePartition("aba"));