# frozen_string_literal: true

# == Schema Information
#
# Table name: likes
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tweet_id   :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_likes_on_tweet_id              (tweet_id)
#  index_likes_on_user_id               (user_id)
#  index_likes_on_user_id_and_tweet_id  (user_id,tweet_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (tweet_id => tweets.id)
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :like do
    tweet
    user
  end
end
