interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const mockQuestions: Question[] = [
  {
    id: 1,
    question: "What is a blockchain?",
    options: [
      "A centralized database",
      "A distributed ledger technology",
      "A social media platform",
      "A programming language",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "What is a smart contract?",
    options: [
      "A legal document",
      "A self-executing contract with code",
      "A paper contract",
      "A mobile app",
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What is Web3?",
    options: [
      "The third version of HTML",
      "A decentralized version of the internet",
      "A web browser",
      "A social network",
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "What is a cryptocurrency wallet?",
    options: [
      "A physical wallet",
      "A bank account",
      "A software that stores private keys",
      "A mobile payment app",
    ],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "What is DeFi?",
    options: [
      "Decentralized Finance",
      "Digital Finance",
      "Direct Finance",
      "Distributed Finance",
    ],
    correctAnswer: 0,
  },
  {
    id: 6,
    question: "What is an NFT?",
    options: [
      "A type of cryptocurrency",
      "A non-fungible token",
      "A network protocol",
      "A new file type",
    ],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "What is mining in blockchain?",
    options: [
      "Digging for cryptocurrencies",
      "Creating new blocks through computation",
      "Searching for gold",
      "Writing smart contracts",
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "What is a DAO?",
    options: [
      "Digital Asset Organization",
      "Decentralized Autonomous Organization",
      "Data Access Object",
      "Distributed Application Online",
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "What is gas fee in Ethereum?",
    options: [
      "Fee for fuel",
      "Transaction processing cost",
      "Environmental tax",
      "Network subscription fee",
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "What is a dApp?",
    options: [
      "Digital Application",
      "Decentralized Application",
      "Desktop Application",
      "Database Application",
    ],
    correctAnswer: 1,
  },
];
