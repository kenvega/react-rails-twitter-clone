# frozen_string_literal: true

class TweetSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :updated_at, :likes_count, :tweet_liked_by_current_user,
             :tweet_bookmarked_by_current_user

  belongs_to :user

  def tweet_liked_by_current_user
    current_user.liked_tweet_ids.include?(object.id)
  end

  def tweet_bookmarked_by_current_user
    current_user.bookmarked_tweet_ids.include?(object.id)
  end
end
