const spinner = document.getElementById("spinner");
export function stopSpinner() {
  spinner.style.display = "none";
}

export function startSpinner() {
  spinner.style.display = "block";
}
