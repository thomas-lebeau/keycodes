import { h, Component } from 'preact';
import { bind } from 'decko';

import { Help } from './help';
import { Undef } from './undef';
import Code from './code';

export default class App extends Component {
  @bind
  handleKeydown({ code, key, keyCode }) {
    this.setState({
      copied: undefined,
      codes: {
        code,
        key,
        keyCode,
      },
    });
  }

  @bind
  handleCopy(name) {
    this.setState({
      copied: name,
    });
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  render({}, { codes, copied }) {
    const cs = codes ? Object.entries(codes) : [];

    return (
      <div>
        event = {codes ? '{' : <Undef />}
        <ul>
          {cs.map(c => (
            <Code
              name={c[0]}
              code={c[1]}
              onCopy={this.handleCopy}
              isCopied={c[0] === copied}
            />
          ))}
          {codes && <li class="comment">&nbsp;&nbsp;// ...</li>}
        </ul>
        {codes && '};'}
        <Help />
      </div>
    );
  }
}
