class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :tweets, dependent: :destroy

  validates :username, uniqueness: { case_sensitive: false }, allow_blank: true

  has_one_attached :avatar

  # to make sure the display_name always has a value for users
  before_save :set_display_name, if: -> { username.present? && display_name.blank? }
  def set_display_name
    self.display_name = username.humanize
  end

end
