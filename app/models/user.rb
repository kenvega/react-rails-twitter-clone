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
#  followed_users_count   :integer          default(0), not null
#  follower_count         :integer          default(0), not null
#  jti                    :string           not null
#  location               :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  url                    :string
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
  has_many :tweets_user_liked, through: :likes, source: :tweet

  has_many :bookmarks, dependent: :destroy
  has_many :tweets_user_bookmarked, through: :bookmarks, source: :tweet

  has_many :retweets, dependent: :destroy
  has_many :tweets_user_retweeted, through: :retweets, source: :tweet

  has_many :given_follows, foreign_key: :follower_id, class_name: 'Follow'
  #           It represents all the Follow instances where the user instance is the follower.
  #           This is a direct relation between User and Follow.
  #           `class_name: 'Follow'` tells Rails that these given_follows are of the Follow class.
  #           `foreign_key: :follower_id` tells Rails to look for Follow instances where
  #                                          the follower_id column matches this user's ID.
  has_many :followed_users, through: :given_follows, source: :followed
  #           It represents the users that the user instance is following.
  #           This is an indirect relationship between User and Follow.
  #             followed_users are connected to the User through the given_follows relationship
  #             Rails first finds all the Follow instances where
  #               this instance user is the follower (using the given_follows relationship)
  #               and then, for each of those Follow instances, gets the followed user.
  #           `source: :followed` tell Rails how to get the followed user from each Follow instance.
  #              this option says that each Follow instance has a `followed` method that returns the followed user

  has_many :received_follows, foreign_key: :followed_id, class_name: 'Follow'
  #           It represents all the Follow instances where the user is followed.
  has_many :followers, through: :received_follows, source: :follower
  #           It represents the users that a user is being followed by

  has_many :tweet_activities, dependent: :destroy

  has_many :viewable_tweet_activities,
           class_name: 'TweetActivity',
           foreign_key: :activity_viewer_id,
           dependent: :destroy
  has_many :created_tweet_activities,
           class_name: 'TweetActivity',
           foreign_key: :activity_creator_id,
           dependent: :destroy

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

  def retweeted_tweet_ids
    @retweeted_tweet_ids ||= retweets.pluck(:tweet_id)
  end
end
