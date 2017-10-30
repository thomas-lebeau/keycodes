import { h, Component } from 'preact';
import { bind } from 'decko';
import copy from 'copy-text-to-clipboard';

export default class Code extends Component {
  @bind
  handleClick() {
    const { code, name, onCopy } = this.props;

    copy(code.toString());
    onCopy(name);
  }

  render({ name, code, isCopied }) {
    return (
      <li>
        &nbsp;&nbsp;
        {name}
        <span class="operator">: </span>
        <span class="string hoverable" onClick={this.handleClick} tabIndex="0">
          '{code}'
        </span>,
        {isCopied && <span class="comment"> // Copied to clipboard</span>}
      </li>
    );
  }
}
