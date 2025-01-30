class TweetSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :updated_at, :likes_count

  belongs_to :user

  def likes_count
    object.likes.count
  end
end
