export function debounce(fn, timeout = 300) {
  let currentCall = null;
  let timer = null;

  return function debouncedFunction(...args) {
    let prevCall = currentCall;

    currentCall = Date.now();

    if (prevCall && currentCall - prevCall <= timeout) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => fn(...args), timeout);
  };
}
