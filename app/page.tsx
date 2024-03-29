import { check, create, del, update } from "@/action/todo.action";
import { db } from "@/lib/db";
import clsx from "clsx";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ChevronRight, Github, Send, Trash2 } from "lucide-react";
import Link from "next/link";
import { LoadButton } from "./components/load-button";

async function getData() {
  const data = await db.todo.findMany({ orderBy: { createdAt: "desc" } });
  return data;
}

export default async function Home() {
  const todo = await getData();

  return (
    <div className="mx-auto mt-10 grid max-w-screen-xl gap-5 px-2 lg:grid-cols-2 lg:px-0">
      <div className=" col-span-2">
        <Button size="icon" asChild>
          <Link
            href="https://github.com/sanlinhtik3/light-note"
            target="_blank"
          >
            <Github className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div>
        <Card className="">
          <form action={create}>
            <CardHeader>
              <CardTitle>Create a Note</CardTitle>
              <CardDescription>
                One click to create a note. That secure and lightweight.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="title"
                    placeholder="Name of your note"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <LoadButton className="w-full">Save</LoadButton>
            </CardFooter>
          </form>
        </Card>
      </div>

      <div className="space-y-3">
        {todo.map((t: any) => (
          <div
            key={t.id}
            className="flex items-center justify-between gap-2 rounded-2xl border p-3"
          >
            <h1
              key={t.id}
              className={clsx("font-bold", {
                "text-gray-500 line-through": t.isCompleted,
              })}
            >
              {t.title}
            </h1>
            <div className="flex items-center justify-end gap-2">
              <form action={check}>
                <input
                  type="hidden"
                  name="id"
                  value={t.id}
                  className="border"
                />
                <LoadButton variant="outline" size="icon" className="w-full">
                  <CheckCircle2 className="h-4 w-4" />
                </LoadButton>
              </form>
              <form action={del}>
                <input
                  type="hidden"
                  name="id"
                  value={t.id}
                  className="border"
                />
                <LoadButton variant="outline" size="icon" className="w-full">
                  <Trash2 className="h-4 w-4" />
                </LoadButton>
              </form>

              <div>
                <form action={update} className=" flex gap-2">
                  <input
                    type="hidden"
                    name="id"
                    value={t.id}
                    className="border"
                  />
                  <Input
                    name="title"
                    defaultValue={t.title}
                    className="border"
                  />
                  <Button type="submit" variant="outline" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
