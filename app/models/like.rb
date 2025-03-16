class Like < ApplicationRecord
  # TODO: en realidad deberías usar counter_cache creo para los likes de los tweets -> belongs_to :tweet, counter_cache: :likes_count
  belongs_to :tweet
  belongs_to :user

  validates :user_id, uniqueness: { scope: :tweet_id }
end
