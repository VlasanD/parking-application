import { Box, Button, Divider, HStack, Text, VStack, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { faParking, faComments, faTicket, faClose, faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../providers/AuthProvider";


function Header() {

  const { token, setToken } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const headerRef = useRef(null);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    // Handle scroll events
    const handleScroll = () => {
      const currScrollPos = window.scrollY;
      const currHeaderElement = headerRef.current;

      if (!currHeaderElement) {
        return;
      }


      if (prevScrollPos > currScrollPos) {
        currHeaderElement.style.transform = "translateY(0)";
      } else {
        currHeaderElement.style.transform = "translateY(-200px)";
      }

      prevScrollPos = currScrollPos;
    };

    // Set up listeners for the scroll event
    window.addEventListener("scroll", handleScroll);

    // Remove listeners for the scroll event
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      color="white"
      ref={headerRef}
      roundedBottom={8}
      zIndex={999}
    >
      <nav>
        <HStack
          px={{ base: 8, md: 16 }}
          py={{ base: 2, md: 4 }}
          justifyContent="space-between"
          alignItems="center"
        >

          <Button
            size={'sm'}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          >

            <FontAwesomeIcon icon={isOpen ? faClose : faBars} size={"lg"} />

          </Button>

          <HStack spacing={12} fontSize={"2xl"} display={{ base: 'none', md: 'flex' }}>
            
            {
              navItemData.map(navItem =>
                <NavItem link={navItem.link} icon={navItem.icon} key={navItem.key}/>
            )}
         
          </HStack>

          <HStack spacing={12} fontSize={"2xl"} display={{ base: 'none', md: 'flex' }}>
            
            {
              !token?
              (<>
                <Link to="/signin"> Sign In </Link>
                <Link to="/signup"> Sign Up </Link>
              </>)
                :
              (<>
                <Link to="/profile"> Profile </Link>
                <Button onClick={() => setToken("")}>
                  <FontAwesomeIcon icon={faRightFromBracket} name={"Log out"} size={"lg"}></FontAwesomeIcon>
                </Button>
              </>)
              }
          
          </HStack>

        </HStack>

        {isOpen ? (
          <Box display={{ md: 'none' }}>
            
            <Divider></Divider>
            
            <VStack 
              paddingY={2} 
              spacing={2} 
              alignItems={'start'} 
              px={8} 
              fontSize={"2xl"}
            >
        
              {
                navItemData.map(navItem =>
                  <NavItem link={navItem.link} icon={navItem.icon} name={navItem.name} key={navItem.key}/>
              )}

              {
              !token?
              (<>
                <Link to="/signin"> Sign In </Link>
                <Link to="/signup"> Sign Up </Link>
              </>)
                :
              ( <>
                <Link to="/profile"> Profile </Link>
                <Button onClick={() => setToken("")}>
                  <FontAwesomeIcon icon={faRightFromBracket} name={"Log out"} size={"lg"}></FontAwesomeIcon>
                </Button>
               </>)
              }
              
         
            </VStack>
         
          </Box>
        
        ) : null}

      </nav>
    
    </Box>
  );
}

const NavItem = ({ link, icon, name }) => {
  return (
    <Link to={link} >
      
      <HStack>
        <FontAwesomeIcon icon={icon} size={"lg"} />
        <Text>{name}</Text>
      </HStack>
   
    </Link>
  );
}

const navItemData = [
  {
    key : 1,
    link: '/',
    icon: faParking,
    name: 'Home',
  },
  {
    key : 2,
    link: '/rentals',
    icon: faTicket,
    name: 'Tickets',
  },
  {
    key : 3,
    link: '/chat',
    icon: faComments,
    name: 'Help / Chat',
  },
];

export default Header;