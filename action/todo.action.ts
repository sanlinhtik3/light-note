"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function create(formData: FormData) {
  const title = formData.get("title") as string;

  const todo = await db.todo.create({
    data: {
      title: title,
    },
  });

  console.log("Todo have been created.");

  revalidatePath("/");
}

export async function check(formData: FormData) {
  const id = formData.get("id") as string;

  const todo = await db.todo.findUnique({
    where: {
      id: id,
    },
  });

  const com = !todo.isCompleted;

  await db.todo.update({
    where: { id: id },
    data: {
      isCompleted: com,
    },
  });
  revalidatePath("/");
}

export async function update(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;

  await db.todo.update({
    where: { id: id },
    data: {
      title: title,
    },
  });
  revalidatePath("/");
}

export async function del(formData: FormData) {
  const id = formData.get("id") as string;
  try {
    await db.todo.delete({
      where: { id: id },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
