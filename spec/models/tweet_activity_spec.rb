# frozen_string_literal: true

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
require 'rails_helper'

RSpec.describe TweetActivity, type: :model do
  it { should belong_to(:activity_viewer).class_name('User') }
  it { should belong_to(:activity_creator).class_name('User') }
  it { should belong_to :tweet }

  it { should validate_presence_of(:activity) }
  it { should validate_inclusion_of(:activity).in_array(TweetActivity::ACTIVITIES) }
end
