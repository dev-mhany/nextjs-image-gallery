import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          {/* HTML Meta Tags */}
          <title>Next AI Engagement Party</title>
          <meta name="description" content="Muhammad & Marwa Engagement party." />

          {/* Facebook Meta Tags */}
          <meta property="og:url" content="https://nextjs-image-gallery-muhammad-hanys-projects.vercel.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Next AI Engagement Party" />
          <meta property="og:description" content="Muhammad & Marwa Engagement party." />
          <meta property="og:image" content="https://opengraph.b-cdn.net/production/documents/cd6f56be-413d-4c67-96d7-8e4efa84513c.jpg?token=3MXETNZp0ZDJEx6WIzHgEtQCDdRNV--FMEoFdfiKOzM&height=1156&width=867&expires=33246880046" />

          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="nextjs-image-gallery-muhammad-hanys-projects.vercel.app" />
          <meta property="twitter:url" content="https://nextjs-image-gallery-muhammad-hanys-projects.vercel.app/" />
          <meta name="twitter:title" content="Next AI Engagement Party" />
          <meta name="twitter:description" content="Muhammad & Marwa Engagement party." />
          <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/documents/cd6f56be-413d-4c67-96d7-8e4efa84513c.jpg?token=3MXETNZp0ZDJEx6WIzHgEtQCDdRNV--FMEoFdfiKOzM&height=1156&width=867&expires=33246880046" />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
