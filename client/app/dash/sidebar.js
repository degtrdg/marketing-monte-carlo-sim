"use client";

import { useUser } from "@/app/utils/user-context";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaGlobe, FaLinkedin } from "react-icons/fa";

export default function Sidebar(props) {
  const router = useRouter();
  const { companyName, companyInfo, searchCompany, pushCompanyInfo } =
    useUser();

  const goHome = () => {
    router.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ height: "100vh" }}
    >
      <VStack
        as={motion.div}
        bg="rgba(0,0,0,0.1)"
        borderRight="1px"
        borderColor="rgba(0,0,0,0.2)"
        boxShadow="2px 0 5px rgba(0,0,0,0.1)"
        alignItems="center"
        {...props}
      >
        <HStack
          as={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          mt={2}
          justifyContent="space-between"
          w="full"
          px={3}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              colorScheme="red"
              leftIcon={<ChevronLeftIcon />}
              size="xs"
              onClick={goHome}
            >
              Back
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
          >
            <Image src="/logo.png" alt="Our Logo" w={6} h={6} />
          </motion.div>
        </HStack>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.4,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Image
            mt={7}
            src={companyInfo?.company_logo}
            alt="Company Logo"
            w={75}
            h={75}
            borderRadius="lg"
            boxShadow="0 0 10px rgba(0,0,0,0.3)"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <Text mt={4} fontWeight="bold">
            {companyName || "N/A"}
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <Text size="sm" textAlign="center">
            {companyInfo?.tagline || "N/A"}
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <Text fontSize="xs">{companyInfo?.industry || "N/A"}</Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <Text fontSize="2xs">
            {companyInfo?.employees || "Size not specified"} employees
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          style={{ width: "100%" }}
        >
          <HStack
            spacing={2}
            borderBottom="1px"
            borderColor="rgba(0,0,0,0.1)"
            w="full"
            justifyContent="center"
            alignItems="center"
            pb={4}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                aria-label="Company Website"
                icon={<FaGlobe />}
                href={companyInfo?.company_url}
                size="sm"
                colorScheme="green"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                aria-label="LinkedIn Profile"
                icon={<FaLinkedin />}
                size="sm"
                colorScheme="blue"
              />
            </motion.div>
          </HStack>
        </motion.div>
      </VStack>
    </motion.div>
  );
}
