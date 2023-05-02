import { Prose } from "@nikolovlazar/chakra-ui-prose";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function GfmRenderer({  children, ...props }) {
    return (
        <Prose {...props}>
            <ReactMarkdown
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            >
                {children}
            </ReactMarkdown>
        </Prose>
    );
}
