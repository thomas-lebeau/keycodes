import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

import Help from './help';
import Undef from './undef';
import Code from './code';
import useEventListener from '../hooks/useEventListener';

export default function App() {
    const [codes, setCodes] = useState([]);
    const [copied, setCopied] = useState();
    const hasCodes = !!codes.length;

    const handleCopy = name => setCopied(name);

    const handleKeydown = ({ code, key, keyCode }) => {
        setCopied();
        setCodes(
            Object.entries({
                code,
                key,
                keyCode,
            })
        );
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
            {hasCodes ? '{' : <Undef />}
            <ul>
                {codes.map(renderCode)}
                {hasCodes && <li className="comment">&nbsp;&nbsp;// ...</li>}
            </ul>
            {hasCodes && '};'}
            <Help />
        </Fragment>
    );
}
