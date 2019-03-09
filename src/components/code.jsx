import { h } from 'preact';
import PropTypes from 'prop-types';
import copy from 'copy-text-to-clipboard';

export default function Code({ name, code, isCopied, onCopy }) {
    const handleClick = () => {
        copy(code.toString());
        onCopy(name);
    };

    return (
        <li>
            &nbsp;&nbsp;
            {name}
            <span className="operator">: </span>
            <button
                type="button"
                className="string hoverable"
                onClick={handleClick}
                tabIndex="0"
            >
                &apos;{code}&apos;
            </button>
            ,
            {isCopied && (
                <span className="comment"> // Copied to clipboard</span>
            )}
        </li>
    );
}

Code.propTypes = {
    name: PropTypes.string.isRequired,
    code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isCopied: PropTypes.bool.isRequired,
    onCopy: PropTypes.func.isRequired,
};
