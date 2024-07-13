"use client";

import { useUser } from "@/app/utils/user-context";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BlurBackground from "./landing/blur-background";

const Section = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { searchCompany } = useUser();

  const handleGenerate = () => {
    searchCompany("Amazon");
    router.push("/dash");
  };

  return (
    <VStack w="full" alignItems="center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
      >
        <Image src="/logo.png" alt="AI Sales Thing" width={100} height={100} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Text fontSize="5xl" fontWeight="bold" mb={12}>
          AI Sales Thing
        </Text>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Input
          placeholder="Company Name"
          w="30%"
          border="1px"
          borderColor="gray.400"
          borderRadius="lg"
          style={{ backdropFilter: "blur(300px)", filter: "brightness(1.1)" }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Textarea
          placeholder="Information about your company"
          w="40%"
          mb={4}
          border="1px"
          borderColor="gray.400"
          borderRadius="lg"
          style={{ backdropFilter: "blur(300px)", filter: "brightness(1.1)" }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <Button
          colorScheme="blue"
          mt={4}
          rightIcon={
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRightIcon />
            </motion.div>
          }
          as={motion.button}
          initial={{
            background:
              "linear-gradient(to bottom, rgba(59, 130, 246, 0.9), rgba(0, 99, 235, 0.9))",
          }}
          whileHover={{
            background:
              "linear-gradient(to bottom, rgba(59, 130, 246, 0.4), rgba(0, 99, 235, 0.4))",
            transition: { duration: 0.2 },
          }}
          border="1px"
          borderColor="blue.500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleGenerate}
        >
          Generate
        </Button>
      </motion.div>
    </VStack>
  );
};

export default function Home() {
  return (
    <Box maxW="100vw" maxH="100vh" overflow="hidden" position="relative">
      <BlurBackground
        style={{
          filter: "blur(80px)",
        }}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex={1}
        w="full"
      >
        <Section />
      </Box>
    </Box>
  );
}
