# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
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
class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :tweets, dependent: :destroy

  has_many :likes, dependent: :destroy
  has_many :liked_tweets, through: :likes, source: :tweet

  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_tweets, through: :bookmarks, source: :tweet

  validates :username, uniqueness: { case_sensitive: false }, allow_blank: true

  has_one_attached :avatar

  # to add more data to the jwt token
  def jwt_payload
    super.merge('username' => self.username, 'user_id' => self.id) # rubocop:disable Style/RedundantSelf
  end

  # to make sure the display_name always has a value for users
  before_save :set_display_name, if: -> { username.present? && display_name.blank? }
  def set_display_name
    self.display_name = username.humanize
  end

  def liked_tweet_ids
    @liked_tweet_ids ||= likes.pluck(:tweet_id)
  end

  def bookmarked_tweet_ids
    # TODO: ??? probar (?) quizas no tiene sentido asi
    @bookmarked_tweet_ids ||= bookmarks.pluck(:tweet_id)
  end
end
