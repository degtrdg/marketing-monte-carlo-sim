"use client";

import {
  Button,
  CircularProgress,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { useUser } from "@/app/utils/user-context";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaChartBar,
  FaFileAlt,
  FaSearch,
  FaSpider,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

const GenerateModal = ({ isOpen, onClose }) => {
  const [visibleStages, setVisibleStages] = useState([]);
  const stages = [
    {
      description: "Searching for company information",
      icon: FaSearch,
    },
    {
      description: "Scraping website",
      icon: FaSpider,
    },
    {
      description: "Getting employees",
      icon: FaUsers,
    },
    {
      description: "Researching employees",
      icon: FaUserTie,
    },
    {
      description: "Performing website analysis",
      icon: FaChartBar,
    },
    {
      description: "Generating report",
      icon: FaFileAlt,
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setVisibleStages([]);
      let cumulativeDelay = 0;
      stages.forEach((_, index) => {
        const randomDelay =
          Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000; // Random delay between 1000ms and 4000ms
        cumulativeDelay += randomDelay;
        setTimeout(() => {
          setVisibleStages((prev) => [...prev, index]);
        }, cumulativeDelay);
      });
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay backdropFilter="blur(3px)" />
      <ModalContent bg="rgba(255,255,255,0.9)">
        <ModalHeader>
          <HStack spacing={4}>
            <CircularProgress isIndeterminate size="5" />
            <Text fontSize="md">Generating Analysis...</Text>
          </HStack>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {stages.map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  visibleStages.includes(index) ? { opacity: 1, y: 0 } : {}
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <HStack spacing={4}>
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={
                      visibleStages.includes(index)
                        ? { rotate: [0, 20, 0] }
                        : {}
                    }
                    transition={{ duration: 0.25, delay: 0.5 }}
                  >
                    <Icon as={stage.icon} boxSize={4} />
                  </motion.div>
                  <Text fontSize="sm">{stage.description}</Text>
                </HStack>
              </motion.div>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default function GenerateButton({ companyName, companyInfo }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { searchCompany } = useUser();

  const handleGenerate = () => {
    onOpen();
    searchCompany(companyName);
    setTimeout(() => {
      onClose();
      router.push("/dash");
      // }, 15000);
    }, 24000);
  };

  return (
    <>
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
        disabled={companyName === "" || companyInfo === ""}
      >
        Generate
      </Button>

      <GenerateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
