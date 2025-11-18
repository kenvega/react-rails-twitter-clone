# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Follows', type: :request do
  let(:user_1) { create(:user) }
  let(:user_2) { create(:user) }

  before { sign_in user_1 }

  describe 'POST create' do
    it 'creates a new following' do
      expect do
        post api_v1_create_follow_path(follower_id: user_1.id, followed_id: user_2.id)
      end.to change { Follow.count }.by(1)
    end

    # it 'creates a new following notification' do
    #   expect do
    #     post api_v1_create_follow_path(follower_id: user_1.id, followed_id: user_2.id)
    #   end.to change { Notification.count }.by(1)
    # end
  end

  describe 'DELETE destroy' do
    it 'deletes an existing following' do
      follow = create(:follow, follower: user_1, followed: user_2)

      expect do
        delete api_v1_delete_follow_path(id: follow.id)
      end.to change { Follow.count }.by(-1)
    end
  end
end
