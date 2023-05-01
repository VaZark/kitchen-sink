import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Container,
    useColorMode,
    Show,
} from "@chakra-ui/react";
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    MoonIcon,
    SunIcon,
} from "@chakra-ui/icons";
import NextLink from "next/link";

export default function StandardLayout({ children }) {
    const { isOpen, onToggle } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box>
            <Flex
                align={"center"}
                gap={2}
                py={2}
                px={4}
                bg={useColorModeValue("white", "purple.900")}
                color={useColorModeValue("purple.800", "white")}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "blackAlpha.400")}
            >
                <Show below='md'>
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? (
                                <CloseIcon w={3} h={3} />
                            ) : (
                                <HamburgerIcon w={5} h={5} />
                            )
                        }
                        variant={"ghost"}
                        aria-label={"Toggle Navigation"}
                    />
                </Show>

                <NextLink href={"/"}>
                    <Text
                        textAlign={useBreakpointValue({
                            base: "center",
                            md: "left",
                        })}
                        alignSelf={{ base: "center" }}
                        fontFamily={"heading"}
                        color={useColorModeValue("gray.800", "white")}
                    >
                        Vaz's Kitchen
                    </Text>
                </NextLink>

                <Box marginLeft={"auto"}>
                    {colorMode === "dark" ? (
                        <IconButton
                            aria-label='dark'
                            bg='transparent'
                            fontSize='20px'
                            icon={<SunIcon />}
                            onClick={toggleColorMode}
                        />
                    ) : (
                        <IconButton
                            aria-label='light'
                            bg='transparent'
                            icon={<MoonIcon />}
                            onClick={toggleColorMode}
                            fontSize='20px'
                        />
                    )}
                </Box>

                <Show above='md'>
                    <Flex>
                        <DesktopNav />
                    </Flex>
                </Show>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
            <Container maxW='5xl'  paddingY={4}>{children}</Container>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("gray.800", "white");
    const popoverContentBgColor = useColorModeValue("white", "gray.800");

    return (
        <Stack direction={"row"} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <Link
                                as={NextLink}
                                p={2}
                                href={navItem.href ?? "#"}
                                fontSize={"sm"}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: "none",
                                    color: linkHoverColor,
                                }}
                            >
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={"xl"}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={"xl"}
                                minW={"sm"}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav
                                            key={child.label}
                                            {...child}
                                        />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            as={NextLink}
            href={href}
            role={"group"}
            display={"block"}
            p={2}
            rounded={"md"}
            _hover={{ bg: useColorModeValue("purple.50", "gray.900") }}
        >
            <Flex
                gap={2}
                direction={"row"}
                align={"center"}
                _groupHover={{ color: "purple.700" }}
            >
                <Box flex={1}>
                    <Text transition={"all .3s ease"} fontWeight={"semi-bold"}>
                        {label}
                    </Text>
                    <Text
                        fontSize={"xs"}
                        fontStyle={"italic"}
                        textAlign={"right"}
                    >
                        {subLabel ? `...${subLabel}` : ""}
                    </Text>
                </Box>
            </Flex>
        </Link>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue("white", "gray.800")}
            p={4}
            display={{ md: "none" }}
        >
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? "#"}
                justify={"space-between"}
                align={"center"}
                _hover={{
                    textDecoration: "none",
                }}
            >
                <Text
                    fontWeight={600}
                    color={useColorModeValue("gray.600", "gray.200")}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={"all .25s ease-in-out"}
                        transform={isOpen ? "rotate(180deg)" : ""}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse
                in={isOpen}
                animateOpacity
                style={{ marginTop: "0!important" }}
            >
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={"solid"}
                    borderColor={useColorModeValue("gray.200", "gray.700")}
                    align={"start"}
                >
                    {children &&
                        children.map((child) => (
                            <Link
                                as={NextLink}
                                key={child.label}
                                py={2}
                                href={child.href}
                            >
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: "Genres",
        children: [
            {
                label: "Syrupy & Sweet",
                subLabel: "and all things nice",
                href: "/blog/bali",
            },
            {
                label: "One Pan recipes",
                subLabel: "for those lazy nights",
                href: "/blog/iceland",
            },
            {
                label: "Sauces",
                subLabel: "the true base for all things great",
                href: "/blog/mauritius",
            },
        ],
    },
    {
        label: "About",
        href: "/info",
    },
];
