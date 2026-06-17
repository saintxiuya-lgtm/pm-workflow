module.exports = function(eleventyConfig) {
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
