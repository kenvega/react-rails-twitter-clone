# frozen_string_literal: true

class HashtagSerializer < ActiveModel::Serializer
  attributes :id, :tag, :created_at, :updated_at, :tweets_count

  def tweets_count
    object.tweets.size
  end
end
