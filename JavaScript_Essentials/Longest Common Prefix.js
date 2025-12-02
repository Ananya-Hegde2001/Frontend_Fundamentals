var longestCommonPrefix = function(strs) {
    let prefix = strs[0];

    for (let str of strs) {
        while (!str.startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
        }
    }
    return prefix;
};
