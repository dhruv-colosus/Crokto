import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Coins,
  Grid,
  Shield,
  Binary,
  Database,
  Box,
  GitBranch,
  Wallet,
  Users,
} from "lucide-react";

interface Category {
  name: string;
  icon: React.ReactNode;
  color: string;
  count: number;
}

const categories: Category[] = [
  {
    name: "Smart Contracts",
    icon: <Code size={18} />,
    color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    count: 45,
  },
  {
    name: "DeFi",
    icon: <Coins size={18} />,
    color: "bg-green-100 hover:bg-green-200 text-green-700",
    count: 32,
  },
  {
    name: "NFTs",
    icon: <Grid size={18} />,
    color: "bg-purple-100 hover:bg-purple-200 text-purple-700",
    count: 28,
  },
  {
    name: "Blockchain Basics",
    icon: <Binary size={18} />,
    color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-700",
    count: 56,
  },
  {
    name: "Web3 Security",
    icon: <Shield size={18} />,
    color: "bg-red-100 hover:bg-red-200 text-red-700",
    count: 23,
  },
  {
    name: "dApp Development",
    icon: <Database size={18} />,
    color: "bg-indigo-100 hover:bg-indigo-200 text-indigo-700",
    count: 41,
  },
  {
    name: "Solidity",
    icon: <Box size={18} />,
    color: "bg-teal-100 hover:bg-teal-200 text-teal-700",
    count: 38,
  },
  {
    name: "Version Control",
    icon: <GitBranch size={18} />,
    color: "bg-orange-100 hover:bg-orange-200 text-orange-700",
    count: 19,
  },
  {
    name: "Token Economics",
    icon: <Wallet size={18} />,
    color: "bg-pink-100 hover:bg-pink-200 text-pink-700",
    count: 25,
  },
  {
    name: "DAO Governance",
    icon: <Users size={18} />,
    color: "bg-cyan-100 hover:bg-cyan-200 text-cyan-700",
    count: 15,
  },
];

export default function CategoriesSection() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Categories</h2>
      </div>
      <ScrollArea className="h-[calc(100%-3rem)] pr-4">
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`
                flex items-center justify-between p-3 rounded-lg 
                transition-all duration-200 cursor-pointer ${category.color}
              `}
            >
              <div className="flex items-center space-x-3">
                <span className="p-1.5 bg-white/50 rounded-md">
                  {category.icon}
                </span>
                <span className="font-medium">{category.name}</span>
              </div>
              <Badge variant="secondary" className="bg-white/50">
                {category.count}
              </Badge>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
