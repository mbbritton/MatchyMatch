import re

# Read the file
with open('src/data/gameArt.jsx', 'r') as f:
    content = f.read()

# Find the ivysicons entry and add jimmiesjam after it
jimmiesjam_art = '''  jimmiesjam: (
    <g>
      {/* Musical notes */}
      <text {...label} className="aa-bobble" x="60" y="52" fontSize="48" fill={W}>🎵</text>
      {/* Instrument icons */}
      <text {...label} className="aa-pop" style={{ '--i': 0 }} x="28" y="88" fontSize="20" fill={W6}>🎸</text>
      <text {...label} className="aa-pop" style={{ '--i': 1 }} x="60" y="88" fontSize="20" fill={W}>🎹</text>
      <text {...label} className="aa-pop" style={{ '--i': 2 }} x="92" y="88" fontSize="20" fill={W6}>🥁</text>
    </g>
  ),'''

# Find the position after ivysicons
pattern = r'(ivysicons: \([\s\S]*?\),)'
match = re.search(pattern, content)

if match:
    insert_pos = match.end()
    new_content = content[:insert_pos] + '\n' + jimmiesjam_art + content[insert_pos:]
    
    with open('src/data/gameArt.jsx', 'w') as f:
        f.write(new_content)
    print('Added jimmiesjam art successfully')
else:
    print('Could not find ivysicons entry')
