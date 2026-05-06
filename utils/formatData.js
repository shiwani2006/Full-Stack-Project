export default function formatDate(value) {
  return new Date(value).toLocaleDateString("en-IN");
}