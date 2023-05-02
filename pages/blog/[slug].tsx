import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import glob from "glob";
import StandardLayout from "../../layouts/StandardLayout";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import { Center, Flex, Heading, Image, Text } from "@chakra-ui/react";

function reformatDate(fullDate) {
    const date = new Date(fullDate);
    return date.toDateString().slice(4);
}

export default function BlogTemplate({ frontmatter, markdownBody, siteTitle }) {
    return (
        <StandardLayout>
            <Image
                width='100%'
                height={"25rem"}
                objectFit={"cover"}
                src={frontmatter.title_image}
                alt={frontmatter.title}
            />
            <article>
                <Flex
                    gap={2}
                    direction={"column"}
                    textAlign={"center"}
                    marginTop={4}
                >
                    <Heading>{frontmatter.title}</Heading>
                    <Text fontSize={"sm"}>{frontmatter.author}</Text>
                    <Text fontSize={"sm"} fontStyle={"italic"}>
                        {reformatDate(frontmatter.date)}
                    </Text>
                </Flex>
                <div>
                    <Prose>
                        <ReactMarkdown>{markdownBody}</ReactMarkdown>
                    </Prose>
                </div>
            </article>
        </StandardLayout>
    );
}

export async function getStaticProps(context) {
    // extracting the slug from the context
    const { slug } = context.params;

    const config = await import(`../../data/config.json`);

    // retrieving the Markdown file associated to the slug
    // and reading its data
    const content = await import(`../../posts/${slug}.md`);
    const data = matter(content.default);

    return {
        props: {
            siteTitle: config.title,
            frontmatter: data.data,
            markdownBody: data.content,
        },
    };
}

export async function getStaticPaths() {
    // getting all .md files from the posts directory
    const blogs = glob.sync("posts/**/*.md");

    // converting the file names to their slugs
    const blogSlugs = blogs.map((file) =>
        file.split("/")[1].replace(/ /g, "-").slice(0, -3).trim()
    );

    // creating a path for each of the `slug` parameter
    const paths = blogSlugs.map((slug) => {
        return { params: { slug: slug } };
    });

    return {
        paths,
        fallback: false,
    };
}
