/**
 * Calculate similarity between two strings (0 to 1) using simple character matching.
 * In a real app, use a library like Fuse.js or Levenshtein distance.
 */
function getSimilarity(s1, s2) {
  let longer = s1.toLowerCase();
  let shorter = s2.toLowerCase();
  if (s1.length < s2.length) {
    longer = s2.toLowerCase();
    shorter = s1.toLowerCase();
  }
  if (longer.length === 0) return 1.0;
  
  let matchCount = 0;
  for(let i=0; i<shorter.length; i++) {
    if(longer.includes(shorter[i])) matchCount++;
  }
  return matchCount / longer.length;
}

/**
 * Clean honorifics from a name strings for better phonetic/fuzzy match.
 */
export const normalizeName = (name) => {
  if (!name) return '';
  return name.toLowerCase()
    .replace(/\b(mulla|shaikh|bs|bhai|ben)\b/g, '') // remove titles
    .replace(/[^a-z0-9]/g, '') // remove special chars
    .trim();
};

/**
 * Search items by checking multiple fields for matches, prioritizing exact matches, 
 * then fuzzy matches.
 * 
 * @param {Array} items Target array to search
 * @param {String} query Search term
 * @param {Array} fields Specific fields to check inside objects
 * @returns Filtered array
 */
export const fuzzySearch = (items, query, fields) => {
  if (!query || !query.trim()) return items;
  
  const q = normalizeName(query);

  return items.filter(item => {
    return fields.some(field => {
      const val = item[field];
      if (!val) return false;
      const normalizedVal = normalizeName(String(val));
      
      // Exact substring match
      if (normalizedVal.includes(q)) return true;
      
      // Fuzzy similarity > 75%
      return getSimilarity(normalizedVal, q) > 0.75;
    });
  });
};
