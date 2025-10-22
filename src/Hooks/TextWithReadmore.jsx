import { useState } from 'react';

const useTextWithReadmore = (initialText) => {
  const [text, setText] = useState(initialText);
  const [showFullText, setShowFullText] = useState(false);

  return {
    text: showFullText && text.length > 16 ? text : `${text.split(' ').slice(0, 14).join(' ')}...`,
    toggleShowFullText: () => setShowFullText(!showFullText)
  };
};
  

export default useTextWithReadmore;
