import matter from "gray-matter";
import {
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import StandardLayout from "../layouts/StandardLayout";
import GfmRenderer from "../components/GfmRenderer";

export default function Info({ markdownBody, title }) {
    return (
        <StandardLayout>
            <VStack spacing={4}>
                <Heading>The Roadmap</Heading>
                <Tabs colorScheme={useColorModeValue("purple", "white")}>
                    <TabList>
                        <Tab>Recipes and Posts</Tab>
                        <Tab>Technical</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <GfmRenderer>
                                {markdownBody.blogRoadmap}
                            </GfmRenderer>
                        </TabPanel>
                        <TabPanel>
                            <GfmRenderer>
                                {markdownBody.technicalRoadmap}
                            </GfmRenderer>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>
        </StandardLayout>
    );
}

export async function getStaticProps() {
    const blogRoadmap = await import("../data/blog-roadmap.md");
    const technicalRoadmap = await import("../data/technical-roadmap.md");

    return {
        props: {
            markdownBody: {
                blogRoadmap: matter(blogRoadmap.default).content,
                technicalRoadmap: matter(technicalRoadmap.default).content,
            },
        },
    };
}
