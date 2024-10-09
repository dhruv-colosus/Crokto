import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Rocket, Trophy, Sparkles, BookOpenCheck } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import CategoriesSection from "@/components/Categories";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-700 to-blue-600 h-[300px] m-4 rounded-xl text-white p-8 flex items-center justify-between">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">
            Master Any Web3 Skill with Crokto
          </h1>
          <p className="text-l opacity-90 max-w-xl">
            Learn blockchain technology, smart contracts, web3 content writing,
            Modern Web3 Designs ,and decentralized applications from industry
            experts
          </p>
          <Button variant="secondary" size="lg">
            Explore Courses
          </Button>
        </div>
        <div className="hidden md:block">
          <BookOpenCheck size={180} className="opacity-80" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[600px] m-4 rounded-md gap-4 no-scollbar">
        {/* Left Section - Course Lists */}
        <div className="w-3/4 rounded-xl bg-white p-6 shadow-sm">
          <ScrollArea className="h-full no-scrollbar">
            {/* Top Courses Section */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="text-yellow-500" />
                <h2 className="text-2xl font-bold">Top Courses</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <CourseCard
                  title="Advanced Ethereum Smart Contract Development"
                  description="Master the art of building secure and efficient smart contracts with Solidity. Learn best practices, security patterns, and advanced concepts."
                  students={2534}
                  hours={15}
                  price={199}
                  discountedPrice={149}
                  imageUrl="/images/authwall.jpg"
                  badge="Bestseller"
                  rating={4.8}
                  instructor="Alex Thompson"
                />
                <CourseCard
                  title="NFT Marketplace Development"
                  description="Build your own NFT marketplace from scratch. Learn about ERC standards, metadata, and marketplace mechanics."
                  students={1234}
                  hours={12}
                  price={149}
                  rating={4.6}
                  instructor="Sarah Chen"
                  badge="Top Rated"
                />
              </div>
            </section>

            {/* Recommended Courses */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-purple-500" />
                <h2 className="text-2xl font-bold">Recommended For You</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <CourseCard
                  title="NFT Marketplace Development"
                  description="Build your own NFT marketplace from scratch. Learn about ERC standards, metadata, and marketplace mechanics."
                  students={1234}
                  hours={12}
                  price={149}
                  rating={4.6}
                  instructor="Sarah Chen"
                />
              </div>
            </section>

            {/* New Courses */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="text-blue-500" />
                <h2 className="text-2xl font-bold">New Courses</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <CourseCard
                  title="NFT Marketplace Development"
                  description="Build your own NFT marketplace from scratch. Learn about ERC standards, metadata, and marketplace mechanics."
                  students={1234}
                  hours={12}
                  price={149}
                  rating={4.6}
                  instructor="Sarah Chen"
                />
              </div>
            </section>
          </ScrollArea>
        </div>

        <CategoriesSection />
      </div>
    </div>
  );
}
