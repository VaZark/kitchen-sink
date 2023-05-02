import ReactMarkdown from "react-markdown";
import {
    Box,
    Flex,
    Image,
    Link,
    LinkBox,
    LinkOverlay,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";

function truncateSummary(content) {
    return content.slice(0, 200).trimEnd();
}

function reformatDate(fullDate) {
    const date = new Date(fullDate);
    return date.toDateString().slice(4);
}

const BlogList = ({ allBlogs }) => {
    return (
        <Flex gap={2} direction={{ base: "column", sm: "row" }}>
            {allBlogs &&
                allBlogs.length > 1 &&
                allBlogs.map((post, index) => {
                    return (
                        <LinkBox
                            key={index}
                            display={"flex"}
                            alignItems={"end"}
                            minH={{ sm: "sm" }}
                            flex={1}
                            _hover={{ flex: 10, w: "100%" }}
                            transition={"all .5s ease-out"}
                            position={"relative"}
                            bgImage={`url('${post.frontmatter.hero_image}')`}
                            bgPosition={"center"}
                            rounded={"md"}
                        >
                            <LinkOverlay
                                href={`/blog/${post.slug}`}
                                fontWeight={"bold"}
                                outline={"purple.800"}
                                p={2}
                                textShadow={"0 0 1em black"}
                                color='whiteAlpha.900'
                            >
                                {post.frontmatter.title}
                            </LinkOverlay>
                        </LinkBox>
                    );
                })}
        </Flex>
    );
};

export default BlogList;
