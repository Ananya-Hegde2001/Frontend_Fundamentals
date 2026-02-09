function createPersistentString(initial = '') {
  const versions = [initial];
  
  return {
    append: (text) => {
      versions.push(versions[versions.length - 1] + text);
      return versions.length - 1;
    },
    
    substring: (start, end, version = -1) => {
      const v = version === -1 ? versions.length - 1 : version;
      return versions[v].substring(start, end);
    },
    
    get: (version = -1) => {
      const v = version === -1 ? versions.length - 1 : version;
      return versions[v];
    },
    
    versionCount: () => versions.length,
    
    history: () => versions.map((v, i) => ({ version: i, text: v })),
    
    structure: 'Persistent String'
  };
}

console.log("\n=== BONUS Program 9: Persistent String ===");
const pstr = createPersistentString("Hello");
pstr.append(" World");
pstr.append("!");
console.log({
  version0: pstr.get(0),
  version1: pstr.get(1),
  current: pstr.get(),
  history: pstr.history()
});