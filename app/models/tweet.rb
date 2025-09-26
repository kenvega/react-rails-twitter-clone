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
class Tweet < ApplicationRecord
  belongs_to :user

  validates :body, presence: true, length: { maximum: 280 }

  has_many :likes, dependent: :destroy
  has_many :users_who_liked, through: :likes, source: :user # a tweet can have many users who liked it

  has_many :bookmarks, dependent: :destroy
  has_many :users_who_bookmarked, through: :bookmarks, source: :user

  has_many :retweets, dependent: :destroy
  has_many :users_who_retweeted, through: :retweets, source: :user

  belongs_to :parent_tweet,
             foreign_key: :parent_tweet_id,
             class_name: 'Tweet',
             inverse_of: :reply_tweets,
             optional: true,
             counter_cache: :reply_tweets_count

  has_many :reply_tweets,
           foreign_key: :parent_tweet_id,
           class_name: 'Tweet',
           inverse_of: :parent_tweet
end
