# frozen_string_literal: true

class AddReplyTweetsCountToTweets < ActiveRecord::Migration[7.0]
  def up
    add_column :tweets, :reply_tweets_count, :integer, null: false, default: 0

    execute <<~SQL
      UPDATE tweets
      SET reply_tweets_count = subquery.reply_tweet_counts
      FROM (
        SELECT parent_tweet_id, COUNT(*) AS reply_tweet_counts
        FROM tweets
        WHERE parent_tweet_id IS NOT NULL
        GROUP BY parent_tweet_id
      ) subquery
      WHERE tweets.id = subquery.parent_tweet_id;
    SQL
  end

  def down
    remove_column :tweets, :reply_tweets_count
  end
end

# this could been here if you just want to add the column
# but we added up and down so we compute the first time the reply_tweet_counts
# def change
#   add_column :tweets, :reply_tweets_count, :integer, null: false, default: 0
# end
