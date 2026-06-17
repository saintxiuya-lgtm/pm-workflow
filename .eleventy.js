module.exports = function(eleventyConfig) {
  var phases = require('./_data/phases.json');

  // Attach prev/next to each phase
  phases.forEach(function(p, i) {
    p.prev = i > 0 ? phases[i - 1] : null;
    p.next = i < phases.length - 1 ? phases[i + 1] : null;
  });

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("favicon.svg");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("search-index.json");

  // JSON filter for embedding data in templates
  eleventyConfig.addFilter("json", function(value) {
    return JSON.stringify(value);
  });

  // Custom filter: find object in array by key
  eleventyConfig.addFilter("find", function(arr, key, value) {
    return (arr || []).find(item => item[key] === value);
  });

  // Phase pages collection
  eleventyConfig.addCollection("phasePages", function() {
    return phases;
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: false
  };
};
