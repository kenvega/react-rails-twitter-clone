# == Schema Information
#
# Table name: tweet_activities
#
#  id                  :bigint           not null, primary key
#  activity            :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  activity_creator_id :bigint           not null
#  activity_viewer_id  :bigint           not null
#  tweet_id            :bigint           not null
#
# Indexes
#
#  index_tweet_activities_on_activity_creator_id  (activity_creator_id)
#  index_tweet_activities_on_activity_viewer_id   (activity_viewer_id)
#  index_tweet_activities_on_tweet_id             (tweet_id)
#
# Foreign Keys
#
#  fk_rails_...  (activity_creator_id => users.id)
#  fk_rails_...  (activity_viewer_id => users.id)
#  fk_rails_...  (tweet_id => tweets.id)
#
FactoryBot.define do
  factory :tweet_activity do
    activity_viewer { create(:user) }
    activity_creator { create(:user) }
    tweet
    activity { TweetActivity::ACTIVITIES.sample }
  end
end
