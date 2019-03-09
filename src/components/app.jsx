import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

import Help from './help';
import Undef from './undef';
import Code from './code';
import useEventListener from '../hooks/useEventListener';

export default function App() {
    const [codes, setCodes] = useState([]);
    const [copied, setCopied] = useState(false);

    const handleCopy = name => setCopied(name);

    const handleKeydown = ({ code, key, keyCode }) => {
        setCopied(false);
        setCodes({
            code,
            key,
            keyCode,
        });
    };

    const renderCode = ([name, code]) => (
        <Code
            key={name}
            name={name}
            code={code}
            onCopy={handleCopy}
            isCopied={name === copied}
        />
    );

    useEventListener('keydown', handleKeydown);

    return (
        <Fragment>
            <span className="operator"> const </span>event
            <span className="operator"> = </span>
            {codes ? '{' : <Undef />}
            <ul>
                {Object.entries(codes).map(renderCode)}
                {codes && <li className="comment">&nbsp;&nbsp;// ...</li>}
            </ul>
            {codes && '};'}
            <Help />
        </Fragment>
    );
}
