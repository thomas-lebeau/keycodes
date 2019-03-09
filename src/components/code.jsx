import copy from 'copy-text-to-clipboard';

export const Code  = ({ name, code, isCopied, onCopy }) => {
  const handleClick = () => {
    copy(code.toString());
    onCopy(name);
  }

  return (
    <li>
      &nbsp;&nbsp;
      {name}
      <span class="operator">: </span>
      <span class="string hoverable" onClick={handleClick} tabIndex="0">
        '{code}'
      </span>,
      {isCopied && <span class="comment"> // Copied to clipboard</span>}
    </li>
  );
};
