export function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600"
        style={{ borderColor: "#f3f3f3", borderTopColor: "#A120DE" }}
      ></div>
    </div>
  );
}
