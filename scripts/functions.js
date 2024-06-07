function gaps(event) {
    if (event.target.value.includes(" ")) {
      event.target.value = event.target.value.replace(/\s/g, "");
    }
  }

export { gaps };