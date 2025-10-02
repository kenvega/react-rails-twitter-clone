# frozen_string_literal: true

# == Schema Information
#
# Table name: tweets
#
#  id                 :bigint           not null, primary key
#  body               :string
#  likes_count        :integer          default(0), not null
#  reply_tweets_count :integer          default(0), not null
#  retweets_count     :integer          default(0), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  parent_tweet_id    :bigint
#  user_id            :bigint           not null
#
# Indexes
#
#  index_tweets_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (parent_tweet_id => tweets.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe Tweet, type: :model do
  it { should belong_to(:user) }

  it { should have_many(:likes).dependent(:destroy) }
  it { should have_many(:users_who_liked).through(:likes).source(:user) }

  it { should have_many(:bookmarks).dependent(:destroy) }
  it { should have_many(:users_who_bookmarked).through(:bookmarks).source(:user) }

  it { should have_many(:retweets).dependent(:destroy) }
  it { should have_many(:users_who_retweeted).through(:retweets).source(:user) }

  it { should have_and_belong_to_many(:hashtags) }

  it { should validate_presence_of(:body) }
  it { should validate_length_of(:body).is_at_most(280) }

  it {
    should belong_to(:parent_tweet).with_foreign_key(:parent_tweet_id).class_name('Tweet')
                                   .inverse_of(:reply_tweets).optional
  }
  it {
    should have_many(:reply_tweets).with_foreign_key(:parent_tweet_id).class_name('Tweet').inverse_of(:parent_tweet)
  }

  describe 'saving hashtags' do
    let(:user) { create(:user) }

    context 'when there are no hashtags in the body' do
      it 'does not create hashtags' do
        expect do
          Tweet.create(user: user, body: 'a simple tweet')
        end.not_to(change { Hashtag.count })
      end
    end

    context 'when there are hashtags in the body' do
      it 'creates hashtags' do
        expect do
          Tweet.create(user: user, body: 'a #simple #tweet')
        end.to change { Hashtag.count }.by(2)
      end

      it 'creates hashtags assigned to the tweet' do
        tweet = Tweet.create(user: user, body: 'a #simple #tweet')
        expect(tweet.hashtags.size).to eq(2)
      end
    end

    context 'when there are duplicate hashtags in the body' do
      it 'does not create extra hashtags' do
        Hashtag.create(tag: 'little')

        expect do
          Tweet.create(user: user, body: 'a #little #simple #tweet')
        end.to change { Hashtag.count }.by(2)
      end
    end
  end
end
