import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
    render(){
        return(
            <Html>
                <Head></Head>
                <body>
                    <Main></Main>
                </body>
                <NextScript/>
            </Html>
        )
    }
}

// this file is created, so that property or script imported here will be automatically shared to all the pages,
// it is kind of boiler plate for other pages

// this file is only executed at server side