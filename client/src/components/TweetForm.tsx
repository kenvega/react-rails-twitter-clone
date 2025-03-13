import { ChangeEvent, FormEvent, MouseEvent } from "react";
import { Button } from "@radix-ui/themes";

const TweetForm = ({
  tweetBody,
  setTweetBody,
  onSubmit,
}: {
  tweetBody: string;
  setTweetBody: (value: string) => void;
  onSubmit: () => void;
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTweetBody(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="p-4 rounded-md hover:bg-slate-200 dark:hover:bg-cyan-900/40">
      <form onSubmit={handleSubmit}>
        <input
          className="w-full rounded-sm px-2 py-2 mb-3 dark:text-stone-600"
          type="text"
          placeholder="What's happening?"
          value={tweetBody}
          onChange={handleChange}
        />

        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default TweetForm;
