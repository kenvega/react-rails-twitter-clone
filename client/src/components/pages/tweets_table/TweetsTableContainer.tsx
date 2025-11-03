import { useState, useEffect } from "react";
import { getTweets } from "../../../services/tweetsService";

import { Tweet } from "../../../types/Tweet";
import { Table } from "@radix-ui/themes";

const AllTweetsContainer = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loadingTweets, setLoadingTweets] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTweets = () => {
    return getTweets()
      .then((tweets) => {
        console.log("response tweets: ", tweets);
        setTweets(tweets);
      })
      .catch((error) => {
        setError(`Error occurred: ${error}`);
        console.error(error);
      })
      .finally(() => {
        setLoadingTweets(false);
      });
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  // TODO: needs to add filtering and pagination later
  return (
    <div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Tweet Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Avatar</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Likes</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Retweets</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {loadingTweets && (
            <Table.Row>
              <Table.Cell>Loading...</Table.Cell>
            </Table.Row>
          )}
          {error && (
            <Table.Row>
              <Table.Cell>{error}</Table.Cell>
            </Table.Row>
          )}
          {!loadingTweets &&
            !error &&
            tweets.map((tweet) => (
              <Table.Row key={tweet.id} align="center">
                <Table.Cell>{tweet.id}</Table.Cell>
                <Table.Cell>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={tweet.user.avatar_url || "/src/assets/profile.svg"}
                    alt={`${tweet.user.username}'s avatar`}
                  />
                </Table.Cell>
                <Table.Cell>{tweet.user.username}</Table.Cell>
                <Table.Cell>{tweet.likes_count}</Table.Cell>
                <Table.Cell>{tweet.retweets_count}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default AllTweetsContainer;
