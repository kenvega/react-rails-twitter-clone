# frozen_string_literal: true

# == Schema Information
#
# Table name: hashtags
#
#  id         :bigint           not null, primary key
#  tag        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_hashtags_on_tag  (tag)
#
class HashtagSerializer < ActiveModel::Serializer
  attributes :id, :tag, :created_at, :updated_at, :tweets_count

  def tweets_count
    object.tweets.size
  end
end
