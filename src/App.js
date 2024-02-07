
import { Component } from 'react';
import { marked } from 'marked';
import * as DOMPurify from 'dompurify';

class Textarea extends Component {

  handleChange = (event) => {
    this.props.onInputChange(event.target.value);
  };

  render() {

    //console.log(this.props.userInput);

    return (
      <div className='page__editor editor'>
        <div className="editor__header">Place content here</div>
        <textarea className="editor__input" id="editor" onChange={this.handleChange} value={this.props.userInput} />
      </div>
    )
  }

}

class Previewer extends Component {

  render() {

    const markdownText = this.props.userInput;
    const htmlText = marked.parse(`${markdownText}`);
    const sanitizedHtml = DOMPurify.sanitize(htmlText);

    return (
      <div className="page__previewer previewer">
        <header className="previewer__header">Preview</header>
        <div className="previewer__content" id="preview" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
      </div>
    )

  }

}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInput: `# Sample Markdown Header Level

## Sample Header Level 2

### Link

Here's a link to [Codepen](https://codepen.io).

### Code Block

1.  Open the file.
2.  Find the following code block on line 21:

        <html>
          <head>
            <title>Test</title>
          </head>

3.  Update the title to match the name of your website.

### Inline Code

I think you should use an \`<addr>\` element here instead.

### List

- First item
- Second item

### Blockquote

> Dorothy followed her through many of the beautiful rooms in her castle.

### Image

![Markdown Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/208px-Markdown-mark.svg.png "Markdown Logo")

### Bold Text

I just love **bold text**.
`,

    }
  }

  handleInputChange = (text) => {
    //console.log(text);
    this.setState({ userInput: text });

  }

  render() {
    return (
      <>
        <Textarea onInputChange={this.handleInputChange} userInput={this.state.userInput} />
        <Previewer userInput={this.state.userInput} />
      </>
    )
  }

}

export default App;
