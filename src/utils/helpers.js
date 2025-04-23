export function setButtonText(
  btn,
  isLoading,
  defualtText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    btn.textContent = loadingText;
  } else {
    btn.textContent = defualtText;
  }
}
