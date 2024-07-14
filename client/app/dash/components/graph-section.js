"use client";

import { Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUser } from "../../utils/user-context";
import LineGraph from "./graphs/line-graph";

export default function GraphSection({ person }) {
  const { companyInfo } = useUser();
  const [data, setData] = useState([
    {
      id: "Average Values",
      data: [],
    },
  ]);

  const getData = () => {
    if (!companyInfo || !person) return [];

    const employeeData = companyInfo.employee_list[person.name]?.results;
    if (!employeeData || !Array.isArray(employeeData)) return [];

    return employeeData.map((item, index) => ({
      x: index + 1,
      y: item.level_of_interest,
    }));
  };

  useEffect(() => {
    setData([
      {
        id: "Interest Level",
        data: getData(),
      },
    ]);
  }, [person, companyInfo]);

  useEffect(() => {
    console.log(companyInfo);
  }, [companyInfo]);

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
        <LineGraph data={data} h="90%" w="full" />
      </VStack>
    </VStack>
  );
}
