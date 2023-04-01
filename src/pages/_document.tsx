import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
    render(): any {
        return (
            <Html lang="pt-br">
                <Head>
                    <link rel="shortcut icon" href="/images/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}