"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface CourseCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  students: number;
  hours: number;
  price: number;
  discountedPrice?: number;
  badge?: string;
  rating: number;
  instructor: string;
}

const formatStudentCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};
const fallbackImage = "/images/authwall.jpg";

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  imageUrl,
  students,
  hours,
  price,
  discountedPrice,
  badge,
  rating,
  instructor,
}) => {
  const router = useRouter();
  return (
    <Card
      className="w-full hover:shadow-xl transition-all duration-300 group cursor-pointer"
      onClick={() => {
        router.push("/course/1");
      }}
    >
      <div className="relative w-full h-[200px]">
        {" "}
        {/* Fixed height container */}
        <Image
          src={imageUrl || fallbackImage}
          alt={title}
          fill
          className="object-cover transform transition-transform duration-300 rounded-t-md"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {badge && (
          <Badge
            variant="secondary"
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm z-10"
          >
            {badge}
          </Badge>
        )}
      </div>
      <CardHeader className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold line-clamp-2 mb-1">
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">by {instructor}</p>
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 text-amber-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-medium">{rating.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {formatStudentCount(students)} students
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {hours}h
          </span>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            {discountedPrice ? (
              <>
                <span className="font-bold text-lg">${discountedPrice}</span>
                <span className="text-sm text-muted-foreground line-through">
                  ${price}
                </span>
                <Badge variant="destructive" className="ml-2">
                  {Math.round(((price - discountedPrice) / price) * 100)}% OFF
                </Badge>
              </>
            ) : (
              <span className="font-bold text-lg">${price}</span>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export default CourseCard;
