import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/ext/language_tools';
import 'brace/ext/searchbox';

import 'brace/theme/kuroir';

import 'brace/mode/javascript';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/ruby';
import 'brace/mode/html';
import 'brace/mode/csharp';
import 'brace/mode/css';

const languages = [
  'javascript',
  'java',
  'python',
  'ruby',
  'html',
  'csharp',
  'css',
];

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      mode: 'javascript',
    };
    this.setMode = this.setMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.props.socket.on('server:newCode', (data) => {
      this.updateCode(data);
    });
  }

  updateCode(data) {
    this.setState({
      code: data.newCode,
    });
  }

  onChange(newCode) {
    this.setState({
      code: newCode,
    });
    this.props.socket.emit('client:updateCode', {
      channelId: this.props.channelId,
      newCode: newCode,
    });
  }

  setMode(e) {
    this.setState({
      mode: e.target.value,
    });
  }

  render() {
    console.log('rendering');
    return (
      <div id="editor">
        <h5>Code Editor</h5>
        <AceEditor
          mode={this.state.mode}
          theme="kuroir"
          onChange={this.onChange.bind(this)}
          value={this.state.code}
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="95vh"
        />
      </div>
    );
  }
}

export default Editor;

// <div>
//  <select className="langSelect" name="mode" onChange={this.setMode} value={this.state.mode}>
//    {languages.map((lang) => <option  key={lang} value={lang}>{lang}</option>)}
//  </select>
// </div>
