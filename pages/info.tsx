import StandardLayout from "../layouts/StandardLayout";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import styles from "../styles/Info.module.css";

export default function Info({ frontmatter, markdownBody, title }) {
    return (
        <StandardLayout>
            <section className={styles.info_blurb}>
                <ReactMarkdown>{markdownBody}</ReactMarkdown>
            </section>
        </StandardLayout>
    );
}

export async function getStaticProps() {
    const content = await import(`../data/info.md`);
    const config = await import(`../data/config.json`);

    const data = matter(content.default);

    return {
        props: {
            title: config.title,
            frontmatter: data.data,
            markdownBody: data.content,
        },
    };
}
