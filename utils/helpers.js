module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  trim_string: (string, length) => {  
    // Trim string to specified length
    if (string.length > length) {
      return `${string.substring(0, length)} ...`;
    }
    return string;
  }
};
