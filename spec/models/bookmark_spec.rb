# frozen_string_literal: true

# == Schema Information
#
# Table name: bookmarks
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tweet_id   :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_bookmarks_on_tweet_id              (tweet_id)
#  index_bookmarks_on_user_id               (user_id)
#  index_bookmarks_on_user_id_and_tweet_id  (user_id,tweet_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (tweet_id => tweets.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe Bookmark, type: :model do
  it { should belong_to :user }
  it { should belong_to :tweet }
end
