function codonOptimization(proteinSeq, organism = 'human') {
  const codonTable = {
    'A': ['GCT', 'GCC', 'GCA', 'GCG'],
    'R': ['CGT', 'CGC', 'CGA', 'CGG', 'AGA', 'AGG'],
    'N': ['AAT', 'AAC'],
    'D': ['GAT', 'GAC'],
    'C': ['TGT', 'TGC'],
    'Q': ['CAA', 'CAG'],
    'E': ['GAA', 'GAG'],
    'G': ['GGT', 'GGC', 'GGA', 'GGG'],
    'H': ['CAT', 'CAC'],
    'I': ['ATT', 'ATC', 'ATA'],
    'L': ['TTA', 'TTG', 'CTT', 'CTC', 'CTA', 'CTG'],
    'K': ['AAA', 'AAG'],
    'M': ['ATG'],
    'F': ['TTT', 'TTC'],
    'P': ['CCT', 'CCC', 'CCA', 'CCG'],
    'S': ['TCT', 'TCC', 'TCA', 'TCG', 'AGT', 'AGC'],
    'T': ['ACT', 'ACC', 'ACA', 'ACG'],
    'W': ['TGG'],
    'Y': ['TAT', 'TAC'],
    'V': ['GTT', 'GTC', 'GTA', 'GTG'],
    '*': ['TAA', 'TAG', 'TGA']
  };
  
  const preferred = {
    'A': 'GCC', 'R': 'CGC', 'N': 'AAC', 'D': 'GAC', 
    'C': 'TGC', 'Q': 'CAG', 'E': 'GAG', 'G': 'GGC',
    'H': 'CAC', 'I': 'ATC', 'L': 'CTG', 'K': 'AAG',
    'M': 'ATG', 'F': 'TTC', 'P': 'CCC', 'S': 'TCC',
    'T': 'ACC', 'W': 'TGG', 'Y': 'TAC', 'V': 'GTG',
    '*': 'TAA'
  };
  
  let dnaSeq = '';
  for (let aa of proteinSeq.toUpperCase()) {
    dnaSeq += preferred[aa] || 'NNN';
  }
  
  return {
    protein: proteinSeq,
    optimized: dnaSeq,
    length: dnaSeq.length,
    organism,
    algorithm: 'Codon Optimization',
    useCase: 'Protein expression optimization'
  };
}

console.log("\n=== BONUS Program 10: Codon Optimization ===");
console.log(codonOptimization("MARK"));