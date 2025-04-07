# frozen_string_literal: true

# == Schema Information
#
# Table name: retweets
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tweet_id   :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_retweets_on_tweet_id              (tweet_id)
#  index_retweets_on_user_id               (user_id)
#  index_retweets_on_user_id_and_tweet_id  (user_id,tweet_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (tweet_id => tweets.id)
#  fk_rails_...  (user_id => users.id)
#
class Retweet < ApplicationRecord
  belongs_to :tweet, counter_cache: :retweets_count
  belongs_to :user

  validates :user_id, uniqueness: { scope: :tweet_id }
end
