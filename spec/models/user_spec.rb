# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  bio                    :text
#  display_name           :string
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  jti                    :string           not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  username               :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_jti                   (jti) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:tweets).dependent(:destroy) }

  it { should have_many(:likes).dependent(:destroy) }
  it { should have_many(:tweets_user_liked).through(:likes).source(:tweet) }

  it { should have_many(:bookmarks).dependent(:destroy) }
  it { should have_many(:tweets_user_bookmarked).through(:bookmarks).source(:tweet) }

  it { should have_many(:retweets).dependent(:destroy) }
  it { should have_many(:tweets_user_retweeted).through(:retweets).source(:tweet) }

  it { should validate_uniqueness_of(:username).case_insensitive.allow_blank }

  describe '#set_display_name' do
    context 'when display_name is set' do
      it 'does not change the display_name' do
        user = build(:user, username: 'john_doe', display_name: 'John doe')
        user.save
        expect(user.reload.display_name).to eq('John doe')
      end
    end

    context 'when display_name is not set' do
      it 'humanizes the previously set username' do
        user = build(:user, username: 'john_doe', display_name: nil)
        user.save
        expect(user.reload.display_name).to eq('John doe')
      end
    end
  end
end
