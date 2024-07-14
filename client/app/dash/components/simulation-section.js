import { Image, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import TypingEffect from "./typing-effect";

const Person = ({ name, description, image, index }) => {
  const [nameDone, setNameDone] = useState(false);

  return (
    <VStack
      bg="rgba(0,0,0,0.1)"
      borderRadius="md"
      w="full"
      p={4}
      alignItems="flex-start"
      spacing={2}
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.5 + 0.2 }}
      >
        <Image
          src={image}
          alt="Person"
          width="40%"
          height="auto"
          objectFit="cover"
          borderRadius="md"
        />
      </motion.div>
      <Text fontWeight="bold">
        <TypingEffect text={name} setDone={setNameDone} />
      </Text>
      {nameDone ? (
        <Text fontSize="sm">
          <TypingEffect text={description} setDone={setNameDone} />
        </Text>
      ) : (
        <Text fontSize="sm">&nbsp;</Text>
      )}
    </VStack>
  );
};

export default function SimulationSection() {
  const people = [
    {
      name: "Person",
      description: "Description",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu2whjzwoBz71waeE07wh1L_sfjpdm6IIf7g&s",
    },
    {
      name: "Person",
      description: "Description",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu2whjzwoBz71waeE07wh1L_sfjpdm6IIf7g&s",
    },
    {
      name: "Person",
      description: "Description",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu2whjzwoBz71waeE07wh1L_sfjpdm6IIf7g&s",
    },
    {
      name: "Person",
      description: "Description",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu2whjzwoBz71waeE07wh1L_sfjpdm6IIf7g&s",
    },
  ];

  return (
    <VStack
      h="full"
      w="60%"
      p={4}
      spacing={6}
      as={motion.div}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 30, ease: "easeOut" }}
      overflowY="scroll"
    >
      {people.map((person, index) => (
        <Person
          key={person.name}
          name={person.name}
          description={person.description}
          image={person.image}
          index={index}
        />
      ))}
    </VStack>
  );
}
