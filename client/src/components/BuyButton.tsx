"use client";

import { buyCourse, hasCourse } from "@/actions/course";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store";
import { toast } from "sonner";
import { useQuery } from "react-query";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { useState } from "react";

const BuyButton = ({ courseId }: { courseId: string }) => {
  const { user } = useAuthStore();
  const { transferTokens } = useOkto() as OktoContextType;
  const [disabled, setDisabled] = useState(false);

  const { data: hasCourseFlag, isLoading } = useQuery(["hasCourse", courseId], {
    queryFn: async () => hasCourse(courseId, user!.email),
  });

  const buyCourseClick = () => {
    transferTokens({
      network_name: "POLYGON_TESTNET_AMOY",
      token_address: "",
      recipient_address: "0xf80FE97797B24956d26d09A51f366229022Da597",
      quantity: "0.01",
    })
      .then(async (result) => {
        console.log("Transfer success", result);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Insufficient funds");
      })
      .then(() => buyCourse(courseId, user!.email))
      .then(() => {
        toast.success("Bought course");
        console.log("bought course");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error buying course");
      })
      .finally(() => {
        setDisabled(true);
        // setLoading(false);
      });
  };

  return (
    <Button
      className="w-full py-6 text-md font-bold"
      onClick={buyCourseClick}
      disabled={isLoading || hasCourseFlag || disabled}
    >
      {hasCourseFlag ? "You have bought this course" : "Enroll Now"}
    </Button>
  );
};

export default BuyButton;
