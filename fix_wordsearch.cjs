const fs = require('fs');
const content = fs.readFileSync('src/components/wordsearch/WordSearchBoard.jsx', 'utf8');

// Find the line with "}, [found, foundCells, grid, placements, words]);"
const lines = content.split('\n');
let insertIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('}, [found, foundCells, grid, placements, words]);')) {
    insertIndex = i + 1;
    break;
  }
}

if (insertIndex === -1) {
  console.log('Could not find insertion point');
  process.exit(1);
}

const fixedCode = [
  '',
  '  // Attach global pointerup so drag ends even outside the grid',
  '  const gridRef = useRef(null);',
  '  const attachedRef = useRef(false);',
  '  const handlePointerUpRef = useRef(handlePointerUp);',
  '  const listenerRef = useRef(null);',
  '',
  '  useEffect(() => {',
  '    // Update the ref to the latest handlePointerUp',
  '    handlePointerUpRef.current = handlePointerUp;',
  '  }, [handlePointerUp]);',
  '',
  '  useEffect(() => {',
  '    // Attach once',
  '    if (!attachedRef.current) {',
  '      attachedRef.current = true;',
  '      listenerRef.current = () => handlePointerUpRef.current();',
  '      if (typeof window !== "undefined") {',
  '        window.addEventListener("pointerup", listenerRef.current);',
  '      }',
  '    }',
  '',
  '    return () => {',
  '      // Cleanup on unmount',
  '      if (listenerRef.current && typeof window !== "undefined") {',
  '        window.removeEventListener("pointerup", listenerRef.current);',
  '      }',
  '    };',
  '  }, []);'
];

const newLines = [
  ...lines.slice(0, insertIndex),
  ...fixedCode,
  ...lines.slice(insertIndex)
];

const result = newLines.join('\n');
fs.writeFileSync('src/components/wordsearch/WordSearchBoard.jsx', result);
console.log('Fixed WordSearchBoard.jsx');
