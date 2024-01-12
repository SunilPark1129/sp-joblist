export function calculateDate(targetDate) {
  // calculate days
  const today = Date.now();
  const days = Math.floor((today - targetDate) / (24 * 3600 * 1000));
  const hours = Math.floor((today - targetDate) / (3600 * 1000));
  let dateStr = "";
  if (days <= 0) {
    dateStr = `${hours} hours ago`;
  } else if (days === 1) {
    dateStr = `${days} day ago`;
  } else {
    dateStr = `${days} days ago`;
  }

  return dateStr;
}
