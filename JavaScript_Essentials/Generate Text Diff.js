function textDiff(text1, text2) {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  
  const diff = [];
  let i = 0, j = 0;
  
  while (i < lines1.length || j < lines2.length) {
    if (i >= lines1.length) {
      diff.push({ type: 'added', line: lines2[j], lineNum: j + 1 });
      j++;
    } else if (j >= lines2.length) {
      diff.push({ type: 'removed', line: lines1[i], lineNum: i + 1 });
      i++;
    } else if (lines1[i] === lines2[j]) {
      diff.push({ type: 'unchanged', line: lines1[i], lineNum: i + 1 });
      i++;
      j++;
    } else {
      let foundMatch = false;
      for (let k = 1; k <= 3; k++) {
        if (i + k < lines1.length && lines1[i + k] === lines2[j]) {
          for (let l = 0; l < k; l++) {
            diff.push({ type: 'removed', line: lines1[i + l], lineNum: i + l + 1 });
          }
          i += k;
          foundMatch = true;
          break;
        }
        if (j + k < lines2.length && lines1[i] === lines2[j + k]) {
          for (let l = 0; l < k; l++) {
            diff.push({ type: 'added', line: lines2[j + l], lineNum: j + l + 1 });
          }
          j += k;
          foundMatch = true;
          break;
        }
      }
      
      if (!foundMatch) {
        diff.push({ type: 'changed', oldLine: lines1[i], newLine: lines2[j], lineNum: i + 1 });
        i++;
        j++;
      }
    }
  }
  
  const stats = {
    added: diff.filter(d => d.type === 'added').length,
    removed: diff.filter(d => d.type === 'removed').length,
    changed: diff.filter(d => d.type === 'changed').length,
    unchanged: diff.filter(d => d.type === 'unchanged').length
  };
  
  return { diff, stats, totalChanges: stats.added + stats.removed + stats.changed };
}

console.log("\n=== Program 3: Text Diff ===");
console.log(textDiff("line1\nline2\nline3", "line1\nmodified\nline3"));