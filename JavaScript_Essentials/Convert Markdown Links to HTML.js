function markdownLinksToHTML(text) {
  return text.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
}

console.log("\n=== BONUS Program 5: Markdown Links to HTML ===");
console.log(markdownLinksToHTML("Check [Google](https://google.com) for search"));
console.log(markdownLinksToHTML("Visit [GitHub](https://github.com) and [NPM](https://npmjs.com)"));