import { ChangeEvent, FormEvent, MouseEvent } from "react";

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
    <div className="bg-slate-200">
      <form onSubmit={handleSubmit}>
        <input
          className="w-full"
          type="text"
          placeholder="What's happening?"
          value={tweetBody}
          onChange={handleChange}
        />

        <div className="flex justify-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TweetForm;
