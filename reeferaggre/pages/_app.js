// pages/_app.js
import '../styles/application.scss'
import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/styles.scss'
import {Layout} from "../components/Layout";

config.autoAddCss = false

function MyApp({Component, pageProps}) {

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp