var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    let map = {};

    for (let c of s) map[c] = (map[c] || 0) + 1;
    for (let c of t) {
        if (!map[c]) return false;
        map[c]--;
    }
    return true;
};
