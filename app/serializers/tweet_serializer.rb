class TweetSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :updated_at, :likes_count, :tweet_liked_by_current_user

  belongs_to :user

  def likes_count
    object.likes.count
  end

  def tweet_liked_by_current_user
    current_user.liked_tweet_ids.include?(object.id)
  end
end
