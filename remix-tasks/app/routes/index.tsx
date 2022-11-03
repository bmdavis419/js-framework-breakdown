import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { Task } from "prisma/generated/client";
import { useEffect } from "react";
import { db } from "~/utils/db.server";

type LoaderData = {
  tasks: Task[];
};

type ActionData = {
  task: Task;
};

export const loader: LoaderFunction = async ({ params }) => {
  const data: LoaderData = {
    tasks: await db.task.findMany(),
  };
  return json(data);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const nTask = await db.task.create({
    data: {
      title: formData.get("title") as string,
    },
  });
  const data: ActionData = {
    task: nTask,
  };
  return json(data);
};

export default function Index() {
  const loaderData = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  return (
    <div className="flex justify-center">
      <div className="min-w-[50%] bg-gray-300 py-8 px-3">
        <h1 className="text-4xl font-bold text-center text-green-500">
          Remix Tasks
        </h1>
        <ul>
          {loaderData.tasks.map((task) => {
            return <li key={task.id}>{task.title}</li>;
          })}
        </ul>
        <Form method="post">
          <fieldset disabled={transition.state === "submitting"}>
            <div>
              <label>
                task
                <input type="text" name="title" />
              </label>
            </div>
            <button type="submit">
              {transition.state === "submitting" ? "Submitting..." : "Submit"}
            </button>
          </fieldset>
        </Form>
      </div>
    </div>
  );
}
