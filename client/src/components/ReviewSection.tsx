"use client";
import React, { useState, useRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { courseContent } from "@/data/mockCourse";
function ReviewSection() {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const handleAddReview = () => {
    console.log("New review:", { rating, comment });
    setRating(0);
    setComment("");
  };
  return (
    <div className="mt-12 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 text-neutral-800">Reviews</h2>
      <div className="space-y-6">
        {courseContent.reviews.map((review) => (
          <Card key={review.id} className="border-neutral-100">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-neutral-700">{review.author}</span>
                <span className="flex items-center ">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-5 h-5 fill-yellow-400 stroke-yellow-400 mr-2"
                    />
                  ))}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-6">Add Review</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Your Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating
              </label>
              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= rating
                        ? "fill-yellow-400 stroke-yellow-400"
                        : "stroke-gray-400"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700"
              >
                Your Comment
              </label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button onClick={handleAddReview}>Submit Review</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ReviewSection;
