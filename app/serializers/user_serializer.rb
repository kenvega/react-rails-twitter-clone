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
class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :display_name, :bio, :location, :url, :avatar_url, :created_at

  def avatar_url
    return unless object.avatar.attached?

    Rails.application.routes.url_helpers.url_for(object.avatar)
  end
end
