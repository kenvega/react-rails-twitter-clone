# frozen_string_literal: true

class AddReplyTweetsCountToTweets < ActiveRecord::Migration[7.0]
  def up
    add_column :tweets, :reply_tweets_count, :integer, null: false, default: 0

    Tweet.find_each do |tweet|
      tweet.update!(reply_tweets_count: tweet.reply_tweets.size)
    end
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
