"use client";

import { useState, useEffect } from "react";
import { Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import LineGraph from "./graphs/line-graph";

export default function GraphSection() {
  const [lineData, setLineData] = useState([{
    id: "Average Values",
    data:  [5, 8, 12, 7, 15, 10, 18],
  }]);

  useEffect(() => {
    // Example data - replace this with your actual data source
    const rawData = [
      [5, 8, 12, 7, 15, 10, 18],
      [6, 9, 11, 8, 14, 12, 17],
      [4, 7, 13, 6, 16, 9, 19],
    ];

    processData(rawData);
  }, []);

  const processData = (rawData) => {
    if (rawData.length === 0 || rawData[0].length === 0) {
      setLineData([]);
      return;
    }

    const averagedData = rawData[0].map((_, index) => {
      const sum = rawData.reduce((acc, curr) => acc + curr[index], 0);
      return sum / rawData.length;
    });

    const formattedData = averagedData.map((value, index) => ({
      x: `Paragraph ${index + 1}`,
      y: value,
    }));

    setLineData([
      {
        id: "Average Values",
        data: formattedData,
      },
    ]);
  };

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
        h="100%"
        borderRadius="lg"
        border="1px"
        borderColor="rgba(0,0,0,0.5)"
        bg="linear-gradient(to top, rgba(5, 153, 233, 0.3), rgba(255, 255, 255, 1))"
        boxShadow="0px 10px 10px -10px rgba(0,0,0,0.4)"
        overflow="hidden"
      >
        <Text h="10%" fontWeight="bold" transform="translateY(5px)">
          Average Sentiment Over Time
        </Text>
        <LineGraph data={lineData} h="90%" w="full" />
      </VStack>
    </VStack>
  );
}
