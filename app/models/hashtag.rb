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
class Hashtag < ApplicationRecord
  has_and_belongs_to_many :tweets

  validates :tag, presence: true, uniqueness: { case_sensitive: false }
end
