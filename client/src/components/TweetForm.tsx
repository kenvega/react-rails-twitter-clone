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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="What's happening?" value={tweetBody} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TweetForm;
