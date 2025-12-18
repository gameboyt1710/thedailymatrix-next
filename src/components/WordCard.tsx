import { WordData } from '@/lib/data';

interface WordCardProps {
  word: WordData;
}

export function WordCard({ word }: WordCardProps) {
  return (
    <div className="word-card">
      <div className="word-main">
        <span className="word-text">{word.word}</span>
        {word.phonetic && <span className="word-phonetic">{word.phonetic}</span>}
      </div>
      {word.partOfSpeech && <div className="word-pos">{word.partOfSpeech}</div>}
      <div className="word-definition">{word.definition}</div>
      {word.example && (
        <div className="word-example">
          <em>&ldquo;{word.example}&rdquo;</em>
        </div>
      )}
    </div>
  );
}
