const spinner = document.getElementById("spinner");
export const stopSpinner = () => {
  spinner.style.display = "none";
};

export const startSpinner = () => {
  spinner.style.display = "block";
};
