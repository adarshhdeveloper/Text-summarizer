
export const summarizeText = (text, maxSentences = 3) => {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];

  const words = text.toLowerCase().match(/\b[a-z0-9]+\b/g) || [];
  const frequency = {};

  for (const word of words) {
    if (word.length > 2) {
      frequency[word] = (frequency[word] || 0) + 1;
    }
  }

  const ranked = sentences.map((sentence, index) => {
    const sentenceWords = sentence.toLowerCase().match(/\b[a-z0-9]+\b/g) || [];

    let score = 0;

    for (const word of sentenceWords) {
      score += frequency[word] || 0;
    }

    return { sentence: sentence.trim(), index, score };
  });

  return ranked
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSentences)
    .sort((a, b) => a.index - b.index)
    .map(item => item.sentence)
    .join(" ");
};