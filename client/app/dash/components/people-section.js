import { Icon, Image, Link, Text, VStack, Wrap } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { FaLinkedin } from "react-icons/fa";
import { useUser } from "../../utils/user-context";
import TypingEffect from "./typing-effect";

const Person = ({ localPerson, person, setPerson, index }) => {
  const isSelected = person?.name === localPerson.name;

  useEffect(() => {
    console.log(person);
  }, [person]);

  return (
    <button onClick={() => setPerson(localPerson)} style={{ width: "100%" }}>
      <VStack
        // bg={isSelected ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"}
        borderRadius="md"
        w="full"
        p={4}
        alignItems="flex-start"
        spacing={2}
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          backgroundColor: isSelected ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)",
          border: isSelected
            ? "1px solid rgba(0,0,0,0.2)"
            : "1px solid rgba(0,0,0,0)",
        }}
        transition={{
          duration: 0.5,
          delay: index * 0.5,
          backgroundColor: { duration: 0.1 },
        }}
      >
        <Wrap>
          <motion.div
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.3, delay: index * 0.5 + 0.2 }}
          >
            <Image
              src={localPerson.image}
              alt="Person"
              width="40%"
              height="auto"
              objectFit="cover"
              borderRadius="md"
            />
          </motion.div>
          <VStack alignItems="flex-start" w="full" spacing={2}>
            <Text fontWeight="bold" textAlign="left">
              <TypingEffect text={localPerson.name} />
            </Text>
            <Text fontSize="sm" textAlign="left">
              <TypingEffect text={localPerson.title} />
            </Text>
          </VStack>
        </Wrap>
        <Text fontSize="sm" textAlign="left">
          <TypingEffect text={localPerson.description} />
        </Text>
        <Link
          href={localPerson.linkedin_url}
          isExternal
          color="blue.500"
          fontSize="sm"
          display="flex"
          alignItems="center"
        >
          <Icon as={FaLinkedin} mr={1} />
          LinkedIn Profile
        </Link>
      </VStack>
    </button>
  );
};

export default function PeopleSection({ person, setPerson }) {
  const { companyInfo } = useUser();

  return (
    <VStack
      h="full"
      w="30%"
      p={4}
      spacing={1}
      as={motion.div}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 30, ease: "easeOut" }}
      overflowY="scroll"
    >
      {companyInfo?.idk_employees?.map((localPerson, index) => (
        <Person
          key={localPerson.name}
          localPerson={localPerson}
          person={person}
          setPerson={setPerson}
          index={index}
        />
      ))}
    </VStack>
  );
}
