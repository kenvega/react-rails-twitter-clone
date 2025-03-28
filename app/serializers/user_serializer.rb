# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :display_name, :avatar_url, :created_at

  def avatar_url
    return unless object.avatar.attached?

    Rails.application.routes.url_helpers.url_for(object.avatar)
  end
end
