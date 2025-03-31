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
require 'rails_helper'

RSpec.describe Tweet, type: :model do
  it { should belong_to(:user) }

  it { should have_many(:likes).dependent(:destroy) }
  it { should have_many(:liked_users).through(:likes).source(:user) }

  it { should have_many(:bookmarks).dependent(:destroy) }
  it { should have_many(:bookmarked_users).through(:bookmarks).source(:user) }

  it { should validate_presence_of(:body) }
  it { should validate_length_of(:body).is_at_most(280) }
end
