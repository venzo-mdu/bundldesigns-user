// const processArabicText = (text) => {
//   const isPara = /\(.*?\)/.test(text);
//   const content =
//     text?.replace(/\(([^)]+)\)/g, '<span class="parens-fix">$1</span>') || "";
//   return { isPara, content };
// };


export const processArabicText = (text) => {
  const parts = [];
  const regex = /\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <span key={match.index} className="parens-fix">
        {match[1]}
      </span>
    );

    lastIndex = regex.lastIndex;
  }
  console.log(text, 'text')
  if (lastIndex < text?.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};
