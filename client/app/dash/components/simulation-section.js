import { Image, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Person = () => {
  return (
    <VStack>
      <Image src="/person.png" alt="Person" />
      <Text>Name</Text>
      <Text>Description</Text>
    </VStack>
  );
};

export default function SimulationSection() {
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
    >
      <Text>Simulation</Text>
    </VStack>
  );
}
