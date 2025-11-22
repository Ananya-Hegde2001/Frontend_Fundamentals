var isPalindrome = function(head) {
    let slow = head, fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    function reverse(node) {
        let prev = null;
        while (node) {
            const next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        return prev;
    }

    let second = reverse(slow);

    while (second) {
        if (head.val !== second.val) return false;
        head = head.next;
        second = second.next;
    }
    return true;
};
