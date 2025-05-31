let dataset = null;

self.onmessage = function (e) {
  if (e.data.type === 'init') {
    dataset = e.data.data;
    return;
  }
  if (e.data.type === 'search' && dataset) {
    const term = e.data.term.toLowerCase();
    if (!term) {
      postMessage([]);
      return;
    }
    const results = Object.entries(dataset)
      .flatMap(([level, words]) =>
        words.map((word) => ({ ...word, level }))
      )
      .filter(
        (word) =>
          word.En.toLowerCase().includes(term) ||
          word.Tr.toLowerCase().includes(term)
      );
    postMessage(results);
  }
};