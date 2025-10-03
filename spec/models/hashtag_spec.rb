# frozen_string_literal: true

# == Schema Information
#
# Table name: hashtags
#
#  id         :bigint           not null, primary key
#  tag        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_hashtags_on_tag  (tag)
#
require 'rails_helper'

RSpec.describe Hashtag, type: :model do
  it { should have_and_belong_to_many(:tweets) }

  it { validate_presence_of :tag }
  it { validate_uniqueness_of(:tag).case_insensitive }
end
