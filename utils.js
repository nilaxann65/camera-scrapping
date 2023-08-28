function formatDate(old_date) {
    const date = new Date(old_date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

module.exports = {
    formatDate
}