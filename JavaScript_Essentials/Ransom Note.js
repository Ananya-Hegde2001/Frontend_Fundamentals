var canConstruct = function(ransomNote, magazine) {
    let map = {};

    for (let c of magazine) map[c] = (map[c] || 0) + 1;
    for (let c of ransomNote) {
        if (!map[c]) return false;
        map[c]--;
    }
    return true;
};
