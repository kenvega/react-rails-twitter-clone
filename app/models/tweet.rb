# frozen_string_literal: true

# == Schema Information
#
# Table name: tweets
#
#  id          :bigint           not null, primary key
#  body        :string
#  likes_count :integer          default(0), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_tweets_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Tweet < ApplicationRecord
  belongs_to :user

  validates :body, presence: true, length: { maximum: 280 }

  has_many :likes, dependent: :destroy
  has_many :liked_users, through: :likes, source: :user

  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_users, through: :bookmarks, source: :user
end
