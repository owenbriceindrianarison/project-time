import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <div>
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
