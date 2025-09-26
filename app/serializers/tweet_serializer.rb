# frozen_string_literal: true

# == Schema Information
#
# Table name: tweets
#
#  id                 :bigint           not null, primary key
#  body               :string
#  likes_count        :integer          default(0), not null
#  reply_tweets_count :integer          default(0), not null
#  retweets_count     :integer          default(0), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  parent_tweet_id    :bigint
#  user_id            :bigint           not null
#
# Indexes
#
#  index_tweets_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (parent_tweet_id => tweets.id)
#  fk_rails_...  (user_id => users.id)
#
class TweetSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :updated_at, :likes_count, :retweets_count, :reply_tweets_count, :tweet_liked_by_current_user,
             :tweet_bookmarked_by_current_user, :tweet_retweeted_by_current_user

  belongs_to :user

  def tweet_liked_by_current_user
    current_user.liked_tweet_ids.include?(object.id)
  end

  def tweet_bookmarked_by_current_user
    current_user.bookmarked_tweet_ids.include?(object.id)
  end

  def tweet_retweeted_by_current_user
    current_user.retweeted_tweet_ids.include?(object.id)
  end
end
