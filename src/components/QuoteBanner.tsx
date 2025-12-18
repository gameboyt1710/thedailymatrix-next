interface QuoteBannerProps {
  quote: string;
  author: string;
}

export function QuoteBanner({ quote, author }: QuoteBannerProps) {
  return (
    <div className="quote-banner">
      <blockquote className="quote-text">&ldquo;{quote}&rdquo;</blockquote>
      <cite className="quote-author">— {author}</cite>
    </div>
  );
}
