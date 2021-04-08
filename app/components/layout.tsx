import {
  Flex,
  Link,
  Heading,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  IconButton,
  useToast,
  ColorModeScript,
  useColorMode,
  Modal,
  ModalOverlay,
  Button,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  HStack,
  Circle,
  Text,
  Image,
} from "@chakra-ui/react"
import { HamburgerIcon, SunIcon } from "@chakra-ui/icons"
import { AuthenticationError, Head, useMutation, useQuery, useRouter } from "blitz"
import logout from "app/auth/mutations/logout"
import { AiFillGithub } from "react-icons/ai"
import { useMediaQuery } from "react-responsive"
import { ChangePassword } from "./changePasswordModal"
import { LoginForm } from "app/auth/components/LoginForm"
import { SignupForm } from "app/auth/components/SignupForm"

export default function Layout({
  showFooter = true,
  user = true,
  hasUnreadMessage = false,
  children,
}) {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

  return (
    <>
      <Head>
        <title>{"Farmers' Market"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ColorModeScript initialColorMode="light" />
      <Flex direction="column" alignItems="center" height="100vh">
        <Flex
          as="header"
          boxShadow="0 0 0 4px #ECECEC"
          backgroundColor="brandGreen.100"
          width="full"
          justifyContent="center"
        >
          <Flex
            width={["100vw", "850px"]}
            direction="row"
            justifyContent="space-between"
            alignItems="self-end"
            marginTop="5px"
          >
            <HStack as="a" href="/">
              <Image src="/logo_1.png" width="6rem" height="6rem" />
              <Heading fontSize="6xl" fontWeight="extrabold" fontFamily="Raleway">
                entel
              </Heading>
            </HStack>
            <Flex
              direction="row"
              justifyContent="space-between"
              margin="0.5rem"
              paddingX="0.5rem"
              paddingTop="0.5rem"
            >
              <HStack marginRight="1rem">
                {user && !isMobile && (
                  <>
                    <Link
                      textTransform="uppercase"
                      fontFamily="Raleway"
                      fontWeight="semibold"
                      paddingX="0.4rem"
                      fontSize="lg"
                      borderBottomWidth="0.3rem"
                      borderBottomColor={
                        window.location.pathname == "/" ? "brandGreen.500" : "brandSilver.200"
                      }
                      _hover={{ borderBottomColor: "brandSilver.500" }}
                      href="/"
                    >
                      Home
                    </Link>
                    <Link
                      textTransform="uppercase"
                      fontFamily="Raleway"
                      fontWeight="semibold"
                      paddingX="0.4rem"
                      fontSize="lg"
                      borderBottomWidth="0.3rem"
                      borderBottomColor={
                        window.location.pathname == "/activeLists"
                          ? "brandGreen.500"
                          : "brandSilver.200"
                      }
                      _hover={{ borderBottomColor: "brandSilver.500" }}
                      href="/activeLists"
                    >
                      Active lists
                    </Link>
                    <Link
                      textTransform="uppercase"
                      fontFamily="Raleway"
                      fontWeight="semibold"
                      paddingX="0.3rem"
                      fontSize="lg"
                      borderBottomWidth="0.3rem"
                      paddingRight={hasUnreadMessage ? "0" : "0.3rem"}
                      borderBottomColor={
                        window.location.pathname == "/chats" ? "brandGreen.500" : "brandSilver.200"
                      }
                      _hover={{ borderBottomColor: "brandSilver.500" }}
                      href="/chats"
                    >
                      <HStack>
                        <Text>Chats</Text>
                        {hasUnreadMessage && (
                          <Circle
                            style={{ marginInlineStart: "0" }}
                            alignSelf="start"
                            size=".3rem"
                            bg="brandChestnut.500"
                          />
                        )}
                      </HStack>
                    </Link>
                  </>
                )}
                {!user && (
                  <>
                    <SignupForm onSuccess={() => router.push("/")} />
                    <LoginForm
                      onSuccess={() => {
                        const next = router.query.next
                          ? decodeURIComponent(router.query.next as string)
                          : "/"
                        router.push(next)
                      }}
                    />
                  </>
                )}
              </HStack>
              {user && (
                <Menu placement="bottom-end" closeOnBlur={true}>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    size="sm"
                    variant="solid"
                    backgroundColor="brandSilver.100"
                    _hover={{ backgroundColor: "brandGreen.200" }}
                    _active={{ backgroundColor: "brandGreen.100" }}
                    borderColor="brandSilver.400"
                    borderWidth="2px"
                    borderRadius="3px"
                  />
                  <MenuList
                    backgroundColor="brandSilver.100"
                    borderWidth="2px"
                    borderColor="brandSilver.300"
                  >
                    {isMobile && (
                      <>
                        <MenuItem
                          _focus={{ backgroundColor: "brandSilver.200" }}
                          _hover={{ backgroundColor: "brandSilver.200" }}
                          onClick={() => (window.location.href = "/")}
                        >
                          Home
                        </MenuItem>
                        <MenuItem
                          _focus={{ backgroundColor: "brandSilver.200" }}
                          _hover={{ backgroundColor: "brandSilver.200" }}
                          onClick={() => (window.location.href = "/activeLists")}
                        >
                          Active lists
                        </MenuItem>
                        <MenuItem
                          _focus={{ backgroundColor: "brandSilver.200" }}
                          _hover={{ backgroundColor: "brandSilver.200" }}
                          onClick={() => (window.location.href = "/chats")}
                        >
                          <HStack>
                            <Text>Chats</Text>
                            {hasUnreadMessage && (
                              <Circle
                                style={{ marginInlineStart: "0" }}
                                alignSelf="start"
                                size=".3rem"
                                bg="brandChestnut.500"
                              />
                            )}
                          </HStack>
                        </MenuItem>
                      </>
                    )}
                    <MenuItem
                      _focus={{ backgroundColor: "brandSilver.200" }}
                      _hover={{ backgroundColor: "brandSilver.200" }}
                      onClick={() => (window.location.href = "/archivedLists")}
                    >
                      Archived Lists
                    </MenuItem>
                    <MenuItem _hover={{ backgroundColor: "brandSilver.200" }} onClick={onOpen}>
                      Change Password
                    </MenuItem>
                    <MenuItem
                      _hover={{ backgroundColor: "brandSilver.200" }}
                      onClick={async () => {
                        window.location.href = "/"
                        await logoutMutation()
                      }}
                    >
                      Logout{" "}
                    </MenuItem>
                    {/*<MenuItem>
                  {" "}
                  <IconButton
                    aria-label="light-mode"
                    icon={<SunIcon />}
                    onClick={toggleColorMode}
                  />
                </MenuItem>*/}
                  </MenuList>
                </Menu>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex
          paddingX="0.2rem"
          width={["100vw", "850px"]}
          flex="1 1 auto"
          direction="column"
          justifyContent="space-between"
        >
          {children}
        </Flex>
        {showFooter && (
          <Flex
            padding=".5rem"
            as="footer"
            direction="column"
            backgroundColor="brandGreen.100"
            width="full"
            textAlign="center"
            alignItems="center"
          >
            <Link href="https://github.com/till-B/entel">
              <HStack>
                <AiFillGithub size={24} />
                <Text>This project is open source. Feel free reach out.</Text>
              </HStack>
            </Link>
            <Text fontFamily="Raleway" fontWeight="medium">
              <Link href="/impressum">Impressum</Link>
              {", "}
              <Link href="/datenschutz">Datenschutz</Link> und ganz viel Liebe
            </Text>
          </Flex>
        )}
        <ChangePassword isOpen={isOpen} onClose={onClose} />
      </Flex>
    </>
  )
}
