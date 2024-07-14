"use client";

import { Box, Image, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import BlurBackground from "./components/blur-background";
import GenerateButton from "./components/generate-button";
const post = `Hello Raghav,

Congrats on raising $500k in your Pre-Seed funding round last year! I’m impressed with how Speck is solving everyday workplace challenges efficiently.

With such growth, managing finances can become tricky. Are you finding it hard to keep your burn rate under control?

At Hiline, we help over 300 businesses keep their finances in check. We handle daily bookkeeping, monthly reports, and payroll. We even helped Jahnel Group save $1M in taxes.

Is this something you’re dealing with? If so, just hit reply and let’s chat.

Best,`;

const Section = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyInfo, setCompanyInfo] = useState("");

  return (
    <VStack w="full" alignItems="center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
      >
        <Image src="/logo.png" alt="SalesSim" width={100} height={100} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Text fontSize="5xl" fontWeight="bold" mb={12}>
          SalesSim
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
          onChange={(e) => setCompanyName(e.target.value)}
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
          onChange={(e) => setCompanyInfo(e.target.value)}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Textarea
          placeholder="Pitch"
          w="50%"
          mb={4}
          border="1px"
          borderColor="gray.400"
          borderRadius="lg"
          value={post}
          disabled
          style={{ backdropFilter: "blur(300px)", filter: "brightness(1.1)" }}
          // onChange={(e) => setCompanyInfo(e.target.value)}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <GenerateButton
          companyName={companyName}
          newCompanyInfo={companyInfo}
          post={post}
        />
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
