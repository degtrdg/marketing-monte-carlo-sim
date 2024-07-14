"use client";

import { Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import BarGraph from "./graphs/bar-graph";
import LineGraph from "./graphs/line-graph";

export default function GraphSection() {
  const lineData = [
    {
      id: "API Calls",
      data: [
        { x: "2023-06-01", y: 5 },
        { x: "2023-06-02", y: 8 },
        { x: "2023-06-03", y: 12 },
        { x: "2023-06-04", y: 7 },
        { x: "2023-06-05", y: 15 },
        { x: "2023-06-06", y: 10 },
        { x: "2023-06-07", y: 18 },
      ],
    },
  ];

  const barData = [
    { category: "Category A", value: 30 },
    { category: "Category B", value: 45 },
    { category: "Category C", value: 60 },
    { category: "Category D", value: 25 },
    { category: "Category E", value: 50 },
  ];

  return (
    <VStack
      h="98%"
      w="50%"
      p={4}
      spacing={3}
      as={motion.div}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 30, ease: "easeOut" }}
    >
      <VStack
        w="full"
        h="50%"
        borderRadius="lg"
        border="1px"
        borderColor="rgba(0,0,0,0.5)"
        bg="linear-gradient(to top, rgba(5, 153, 233, 0.3), rgba(255, 255, 255, 1))"
        boxShadow="0px 10px 10px -10px rgba(0,0,0,0.4)"
        overflow="hidden"
      >
        <Text h="10%" fontWeight="bold" transform="translateY(5px)">
          Graph 1
        </Text>
        <LineGraph data={lineData} h="full" w="full" />
      </VStack>
      <VStack
        w="full"
        h="50%"
        borderRadius="lg"
        border="1px"
        borderColor="rgba(0,0,0,0.5)"
        bg="linear-gradient(to top, rgba(5, 153, 233, 0.3), rgba(255, 255, 255, 1))"
        boxShadow="0px 10px 10px -10px rgba(0,0,0,0.4)"
        overflow="hidden"
      >
        <Text h="10%" fontWeight="bold" transform="translateY(5px)">
          Graph 1
        </Text>
        <BarGraph data={barData} h="full" w="full" />
      </VStack>
    </VStack>
  );
}
