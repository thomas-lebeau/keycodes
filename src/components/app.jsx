import { h } from 'preact';
import { useState } from 'preact/hooks';

import { Help } from './help';
import { Undef } from './undef';
import { Code } from './code';
import { useEventListener } from '../hooks/useEventListener';

export const App = ()  => {
  const [codes, setCodes] = useState([]);
  const [copied, setCopied] = useState(false);

  const handleCopy = name => setCopied(name);
  const handleKeydown = ({ code, key, keyCode }) => {
    setCopied(false);
    setCodes({
      code,
      key,
      keyCode,
    })
  }

  useEventListener('keydown', handleKeydown);

  return (
    <main>
      <span class="operator"> const </span>event<span class="operator"> = </span>
      {codes ? '{' : <Undef />}
      <ul>
        {Object.entries(codes).map(c => (
          <Code
            name={c[0]}
            code={c[1]}
            onCopy={handleCopy}
            isCopied={c[0] === copied}
          />
        ))}
        {codes && <li class="comment">&nbsp;&nbsp;// ...</li>}
      </ul>
      {codes && '};'}
      <Help />
    </main>
  );
}

export default App;
