module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  is_equal: (v1, v2) => {
    if( v1 === v2) {
      return true;
    } return false;
  },
  get_id: () => {
    return sessionStorage.getItem('user_id');
  }
};
