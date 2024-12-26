function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

function isValidDate(value) {
  const date = new Date(value);
  return value && date !== "Invalid Date";
}

function isValidImageUrl(value) {
  return value && value.startsWith("http");
}

const _isValidText = isValidText;
export { _isValidText as isValidText };
const _isValidDate = isValidDate;
export { _isValidDate as isValidDate };
const _isValidImageUrl = isValidImageUrl;
export { _isValidImageUrl as isValidImageUrl };
