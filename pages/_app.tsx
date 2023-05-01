import { Work_Sans } from "@next/font/google";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { withProse } from '@nikolovlazar/chakra-ui-prose';

// importing the Work Sans font with
// the Next.js 13 Font Optimization Feature
const workSans = Work_Sans({
    weight: ["400", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
});


const theme = extendTheme({}, withProse());


function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
