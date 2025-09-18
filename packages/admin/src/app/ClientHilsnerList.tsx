"use client";
import { Menu } from "lucide-react";
import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateState } from "./actions";
import { ChangeStateButton } from "./changeStateButton";

type Hilsen = {
  id: number;
  name: string;
  message: string;
  status: "pending" | "approved" | "rejected";
};

export default function ClientHilsnerList({
  initialHilsner,
}: {
  initialHilsner: Hilsen[];
}) {
  const [hilsner, setHilsner] = useState(initialHilsner);
  const [, startTransition] = useTransition();

  const handleChangeState = (id: number, state: Hilsen["status"]) => {
    // Optimistically update UI
    setHilsner((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: state } : h)),
    );
    // Update server in background
    startTransition(() => {
      updateState(state, id).catch(() => {
        // Optionally: revert if failed
        setHilsner((prev) => prev);
      });
    });
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">
      {hilsner.map((h) => (
        <Card key={h.id} className="p-4 min-w-[300px]">
          <CardHeader className="">
            <CardTitle>{h.name}</CardTitle>
            <CardDescription>
              status: <Badge variant={h.status}>{h.status}</Badge>
            </CardDescription>
            <CardAction>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Menu />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <ChangeStateButton
                      id={h.id}
                      state="pending"
                      onChange={handleChangeState}
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ChangeStateButton
                      id={h.id}
                      state="approved"
                      onChange={handleChangeState}
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ChangeStateButton
                      id={h.id}
                      state="rejected"
                      onChange={handleChangeState}
                    />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardAction>
          </CardHeader>
          <CardContent>{h.message}</CardContent>
        </Card>
      ))}
    </main>
  );
}
